import {TargetSet} from "../shared/model/dto/target-set";
import {ProgExercise} from "../shared/model/dto/prog-exercise";
import {Duration} from "../shared/model/dto/duration";
import {getStringTime} from "./duration-functions";


////////////////////////////////// CARD INFORMATION //////////////////////////////////////////

export function getTargetSetsInformation(progExercise: ProgExercise) {
  let lastTargetSet: TargetSet[] = getUpToDateTargetSets(progExercise);
  lastTargetSet = lastTargetSet.sort(sortLastTargetSetsByIndex);

  return lastTargetSet.map((targetSet: TargetSet) => getTargetSetInformation(targetSet));
}

export function getTargetSetInformation(targetSet: TargetSet) {
  let set: string = targetSet.setNumber + "x" + targetSet.repetitionNumber + " reps";
  if (targetSet.weight > 0)
    set += " at " + targetSet.weight + targetSet.weightUnit;
  return set;
}

////////////////////////////////// TIME FUNCTIONS //////////////////////////////////////////

export function getTargetSetTimeToString(targetSet: TargetSet, isLastTargetSet: boolean = false): string {
  const timeAmount: Duration = getTargetSetTimeAmount(targetSet, isLastTargetSet);
  return getStringTime(timeAmount);
}

export function getTargetSetTimeAmount(targetSet: TargetSet, isLastTargetSet: boolean = false): Duration {
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

////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function getTargetSetLogs(targetSetUpToDate: TargetSet, progExercise: ProgExercise, includeFirstTargetSet: boolean = false): TargetSet[] {
  const targetSetLogs: TargetSet[] = [];
  if (includeFirstTargetSet)
    targetSetLogs.push(targetSetUpToDate);
  getTargetSetUpdate(targetSetUpToDate, progExercise, targetSetLogs);
  return targetSetLogs;
}

function getTargetSetUpdate(targetSetUpToDate: TargetSet, progExercise: ProgExercise, targetSetLogs: TargetSet[]) {
  progExercise.targetSets.forEach((targetSet: TargetSet) => {
    if (targetSet.targetSetUpdate !== null)
      if (targetSet.targetSetUpdate.id === targetSetUpToDate.id) {
        targetSetLogs.push(targetSet);
        getTargetSetUpdate(targetSet, progExercise, targetSetLogs);
      }
  })
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
