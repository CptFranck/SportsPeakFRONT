import {TargetSet} from "../interface/dto/target-set";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {Duration} from "../interface/dto/duration";

////////////////////////////////// CARD INFORMATION //////////////////////////////////////////

export function getTargetSetsInformation(progExercise: ProgExercise) {
  let lastTargetSet: TargetSet[] = getUpToDateTargetSets(progExercise);
  lastTargetSet = lastTargetSet.sort(sortLastTargetSetsByIndex);

  return lastTargetSet.map((targetSet: TargetSet) => getTargetSetInformation(targetSet));
}

export function getTargetSetInformation(targetSet: TargetSet) {
  let set: string = targetSet.setNumber + " set of " + targetSet.repetitionNumber + " reps";
  if (targetSet.weight > 0)
    set += " with " + targetSet.weight + " " + targetSet.weightUnit;
  return set;
}

////////////////////////////////// TIME FUNCTIONS //////////////////////////////////////////

export function getProgExerciseTime(progExercise: ProgExercise) {
  let lastTargetSet: TargetSet[] = getUpToDateTargetSets(progExercise);
  lastTargetSet = lastTargetSet.sort(sortLastTargetSetsByIndex);

  const totalTimeAmount: Duration = {seconds: 0, minutes: 0, hours: 0};

  lastTargetSet.forEach((targetSet: TargetSet, key: number, array: TargetSet[]) => {
    let isLastTargetSet: boolean = false
    if (array.length - 1 === key)
      isLastTargetSet = true;
    let timeAmount: Duration = getTargetSetTime(targetSet, isLastTargetSet);
    addDuration(totalTimeAmount, timeAmount);
  })
  return getStringTime(totalTimeAmount["seconds"], totalTimeAmount["minutes"], totalTimeAmount["hours"]);
}

export function addDuration(durationA: Duration, durationB: Duration) {
  durationA["seconds"] += durationB["seconds"];
  durationA["minutes"] += durationB["minutes"];
  durationA["hours"] += durationB["hours"];
}

export function getTargetSetTimeToString(targetSet: TargetSet, isLastTargetSet: boolean = false): string {
  const timeAmount: Duration = getTargetSetTime(targetSet, isLastTargetSet);
  return getStringTime(timeAmount["seconds"], timeAmount["minutes"], timeAmount["hours"]);
}

export function getTargetSetTime(targetSet: TargetSet, isLastTargetSet: boolean = false): Duration {
  const timeAmount: Duration = {seconds: 0, minutes: 0, hours: 0};
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

////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

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
