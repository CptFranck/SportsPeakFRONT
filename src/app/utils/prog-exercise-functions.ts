import {TargetSet} from "../interface/dto/target-set";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {Dictionary} from "../interface/utils/dictionary";

export function getTargetSetsInformation(progExercise: ProgExercise) {
  let lastTargetSet: TargetSet[] = getLastTargetSets(progExercise);
  lastTargetSet = sortLastTargetSetsByWeight(lastTargetSet)

  return lastTargetSet.map((targetSet: TargetSet) => {
    let set: string = targetSet.setNumber + " set of " + targetSet.repetitionNumber + " reps";
    if (targetSet.weight > 0) {
      set += " with " + targetSet.weight + " " + targetSet.weightUnit;
    }
    return set;
  });
}

export function getProgExerciseTime(progExercise: ProgExercise) {
  let lastTargetSet: TargetSet[] = getLastTargetSets(progExercise);

  let totalSeconds: number = 0;
  let totalMinutes: number = 0;
  let totalHours: number = 0;

  lastTargetSet.forEach((targetSet: TargetSet) => {
    const timeAmount: Dictionary<number> = getTimeAmount(targetSet);
    totalSeconds += timeAmount["seconds"];
    totalMinutes += timeAmount["minutes"];
    totalHours += timeAmount["hours"];
  })
  return getStringTime(totalSeconds, totalMinutes, totalHours);
}

export function getTargetSetTime(targetSet: TargetSet): string {
  const timeAmount: Dictionary<number> = getTimeAmount(targetSet);
  return getStringTime(timeAmount["seconds"], timeAmount["minutes"], timeAmount["hours"]);
}

export function getTimeAmount(targetSet: TargetSet): Dictionary<number> {
  const timeAmount: Dictionary<number> = {}
  const totalSets: number = targetSet.setNumber;
  const totalReps: number = targetSet.repetitionNumber * targetSet.setNumber;
  timeAmount["seconds"] = targetSet.physicalExertionUnitTime.seconds * totalReps + targetSet.restTime.seconds * totalSets;
  timeAmount["minutes"] = targetSet.physicalExertionUnitTime.minutes * totalReps + targetSet.restTime.minutes * totalSets;
  timeAmount["hours"] = targetSet.physicalExertionUnitTime.hours * totalReps + targetSet.restTime.hours * totalSets;
  return timeAmount;
}

export function getStringTime(seconds: number, minutes: number, hours: number): string {
  const secondsLeft: number = seconds % 60;
  const additionalMinutes: number = (seconds - secondsLeft) / 60
  const minutesLeft: number = (minutes + additionalMinutes) % 60;
  const additionalHours: number = (minutes + additionalMinutes - minutesLeft) / 60;
  const h: number = (hours + additionalHours) % 60
  return +h + "h" + minutesLeft + "m" + secondsLeft + "s";
}

function getLastTargetSets(progExercise: ProgExercise): TargetSet[] {
  return progExercise.targetSets.filter((targetSet: TargetSet) => targetSet.targetSetUpdate === null)
}

function sortLastTargetSetsByWeight(targetSets: TargetSet[]): TargetSet[] {
  return targetSets.sort((a: TargetSet, b: TargetSet) => {
    if (a.weight > b.weight) return 1;
    if (a.weight < b.weight) return -1;
    return 0;
  })
}
