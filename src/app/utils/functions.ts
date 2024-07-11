import {TargetSet} from "../interface/dto/target-set";
import {ProgExercise} from "../interface/dto/prog-exercise";

export function getTargetSetsInformation(progExercise: ProgExercise) {
  const lastTargetSet: TargetSet[] = getLastTargetSets(progExercise);
  return lastTargetSet.map((targetSet: TargetSet) => {
    let set: string = targetSet.setNumber + " set of " + targetSet.repetitionNumber + " reps with ";
    if (targetSet.weight > 0) {
      set += targetSet.weight + " " + targetSet.weightUnit;
    } else {
      set += "no weight";
    }
    return set;
  });
}

export function getProgExerciseTime(progExercise: ProgExercise) {
  const lastTargetSet: TargetSet[] = getLastTargetSets(progExercise);


  let totalSeconds: number = 0;
  let totalMinutes: number = 0;
  let totalHours: number = 0;

  lastTargetSet.forEach((targetSet: TargetSet) => {
    let totalSets: number = targetSet.setNumber;
    let totalReps: number = targetSet.repetitionNumber * targetSet.setNumber;
    totalSeconds += targetSet.physicalExertionUnitTime.seconds * totalReps + targetSet.restTime.seconds * totalSets;
    totalMinutes += targetSet.physicalExertionUnitTime.minutes * totalReps + targetSet.restTime.minutes * totalSets;
    totalHours += targetSet.physicalExertionUnitTime.hours * totalReps + targetSet.restTime.hours * totalSets;
  })
  const secondsLeft: number = totalSeconds % 60;
  const additionalMinutes: number = (totalSeconds - secondsLeft) / 60
  const minutesLeft: number = (totalMinutes + additionalMinutes) % 60;
  const additionalHours: number = (totalMinutes + additionalMinutes - minutesLeft) / 60;
  const h: number = (totalHours + additionalHours) % 60
  return +h + "h" + minutesLeft + "m" + secondsLeft + "s";
}

function getLastTargetSets(progExercise: ProgExercise): TargetSet[] {
  return progExercise.targetSets.filter((targetSet: TargetSet) => targetSet.targetSetUpdate === null)
}

function sortLastTargetSets(targetSets: TargetSet[]): TargetSet[] {
  return targetSets.sort((a: TargetSet, b: TargetSet) => {
    if (a.weight > b.weight) return 1;
    if (a.weight < b.weight) return -1;
    return 0;
  })
}
