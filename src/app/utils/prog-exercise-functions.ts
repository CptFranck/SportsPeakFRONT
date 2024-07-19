import {TargetSet} from "../interface/dto/target-set";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {Dictionary} from "../interface/utils/dictionary";

export function getTargetSetsInformation(progExercise: ProgExercise) {
  let lastTargetSet: TargetSet[] = getUpToDateTargetSets(progExercise);
  lastTargetSet = lastTargetSet.sort(sortLastTargetSetsByIndex);

  return lastTargetSet.map((targetSet: TargetSet) => getTargetSetInformation(targetSet));
}

export function getTargetSetInformation(targetSet: TargetSet) {
  let set: string = targetSet.setNumber + " set of " + targetSet.repetitionNumber + " reps";
  if (targetSet.weight > 0) {
    set += " with " + targetSet.weight + " " + targetSet.weightUnit;
  }
  return set;
}

export function getProgExerciseTime(progExercise: ProgExercise) {
  let lastTargetSet: TargetSet[] = getUpToDateTargetSets(progExercise);
  lastTargetSet = lastTargetSet.sort(sortLastTargetSetsByIndex);

  let totalSeconds: number = 0;
  let totalMinutes: number = 0;
  let totalHours: number = 0;

  lastTargetSet.forEach((targetSet: TargetSet, key: number, array: TargetSet[]) => {
    let isLastTargetSet: boolean = false
    if (array.length - 1 === key)
      isLastTargetSet = true;
    const timeAmount: Dictionary<number> = getTimeAmount(targetSet, isLastTargetSet);
    totalSeconds += timeAmount["seconds"];
    totalMinutes += timeAmount["minutes"];
    totalHours += timeAmount["hours"];
  })
  return getStringTime(totalSeconds, totalMinutes, totalHours);
}

export function getTargetSetTime(targetSet: TargetSet, isLastTargetSet: boolean = false): string {
  const timeAmount: Dictionary<number> = getTimeAmount(targetSet, isLastTargetSet);
  return getStringTime(timeAmount["seconds"], timeAmount["minutes"], timeAmount["hours"]);
}

export function getTimeAmount(targetSet: TargetSet, isLastTargetSet: boolean = false): Dictionary<number> {
  const timeAmount: Dictionary<number> = {}
  let totalRest: number = targetSet.setNumber;
  if (isLastTargetSet)
    totalRest -= 1;
  const totalReps: number = targetSet.repetitionNumber * targetSet.setNumber;
  timeAmount["seconds"] = targetSet.physicalExertionUnitTime.seconds * totalReps + targetSet.restTime.seconds * totalRest;
  timeAmount["minutes"] = targetSet.physicalExertionUnitTime.minutes * totalReps + targetSet.restTime.minutes * totalRest;
  timeAmount["hours"] = targetSet.physicalExertionUnitTime.hours * totalReps + targetSet.restTime.hours * totalRest;
  return timeAmount;
}

export function getStringTime(seconds: number, minutes: number, hours: number): string {
  const secondsLeft: number = seconds % 60;
  const additionalMinutes: number = (seconds - secondsLeft) / 60
  const minutesLeft: number = (minutes + additionalMinutes) % 60;
  const additionalHours: number = (minutes + additionalMinutes - minutesLeft) / 60;
  const totalHours: number = (hours + additionalHours) % 60
  return totalHours + "h" + minutesLeft + "m" + secondsLeft + "s";
}

export function getUpToDateTargetSets(progExercise: ProgExercise): TargetSet[] {
  return progExercise.targetSets.filter((targetSet: TargetSet) => targetSet.targetSetUpdate === null)
}

export function sortLastTargetSetsByIndex(a: TargetSet, b: TargetSet) {
  if (a.index > b.index) return 1;
  if (a.index < b.index) return -1;
  return sortLastTargetSetsByWeight(a, b);
}

function sortLastTargetSetsByWeight(a: TargetSet, b: TargetSet) {
  if (a.weight > b.weight) return 1;
  if (a.weight < b.weight) return -1;
  return 0;
}
