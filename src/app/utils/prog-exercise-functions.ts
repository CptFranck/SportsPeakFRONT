import {TargetSet} from "../interface/dto/target-set";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {Duration} from "../interface/dto/duration";
import {TargetSetState} from "../interface/enum/targetSetState";
import {ProgExerciseTargetSets} from "../interface/utils/progExerciseTargetSets";

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
    let timeAmount: Duration = getTargetSetTimeAmount(targetSet, isLastTargetSet);
    addDurationAmount(totalTimeAmount, timeAmount);
  })
  return getStringTime(totalTimeAmount);
}

export function addDurationAmount(durationA: Duration, durationB: Duration) {
  durationA["seconds"] += durationB["seconds"];
  durationA["minutes"] += durationB["minutes"];
  durationA["hours"] += durationB["hours"];
}

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

export function getStringTime(duration: Duration): string {
  const formatedDuration: Duration = formatTimeDuration(duration);
  return formatedDuration["hours"] + "h" + formatedDuration["minutes"] + "m" + formatedDuration["seconds"] + "s";
}

export function formatTimeDuration(duration: Duration): Duration {
  const formatDuration: Duration = {seconds: 0, minutes: 0, hours: 0};
  formatDuration["seconds"] = duration["seconds"] % 60;
  const additionalMinutes: number = (duration["seconds"] - formatDuration["seconds"]) / 60

  formatDuration["minutes"] = (duration["minutes"] + additionalMinutes) % 60;
  const additionalHours: number = (duration["minutes"] + additionalMinutes - formatDuration["minutes"]) / 60;

  formatDuration["hours"] = (duration["hours"] + additionalHours) % 60
  return formatDuration;
}

////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function getProgExerciseTargetSet(targetSets: TargetSet[]): ProgExerciseTargetSets {
  const targetSetUsed: TargetSet[] = [];
  const targetSetUnused: TargetSet[] = [];
  const targetSetHidden: TargetSet[] = [];

  targetSets.forEach((targetSet: TargetSet) => {
    if (targetSet.state === TargetSetState.USED)
      targetSetUsed.push(targetSet);
    else if (targetSet.state === TargetSetState.UNUSED)
      targetSetUnused.push(targetSet);
    else if (targetSet.state === TargetSetState.HIDDEN)
      targetSetHidden.push(targetSet);
  })
  return {
    targetSetUsed: targetSetUsed,
    targetSetUnused: targetSetUnused,
    targetSetHidden: targetSetHidden
  }
}

export function getTargetSetLogs(targetSetUpToDate: TargetSet, progExercise: ProgExercise): TargetSet[] {
  const targetSetLogs: TargetSet[] = [];
  targetSetLogs.push(targetSetUpToDate)
  getTargetSetUpdate(targetSetUpToDate, progExercise, targetSetLogs)
  return targetSetLogs;
}

function getTargetSetUpdate(targetSetUpToDate: TargetSet, progExercise: ProgExercise, targetSetLogs: TargetSet[]) {
  progExercise.targetSets.find((targetSet: TargetSet) => {
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
