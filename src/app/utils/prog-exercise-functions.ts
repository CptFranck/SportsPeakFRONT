import {TargetSet} from "../interface/dto/target-set";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {Duration} from "../interface/dto/duration";
import {TargetSetState} from "../interface/enum/targetSetState";
import {ProgExerciseTargetSets} from "../interface/utils/progExerciseTargetSets";
import {addDurationAmount, getStringTime} from "./duration-functions";
import {getTargetSetTimeAmount, getUpToDateTargetSets, sortLastTargetSetsByIndex} from "./target-set-functions";

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
