import {ExerciseType} from "../interface/dto/exercise-type";

export function sortExerciseTypeByName(a: ExerciseType, b: ExerciseType) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
