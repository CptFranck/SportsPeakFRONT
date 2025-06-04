import {Exercise} from "../shared/model/dto/exercise";

export function sortExerciseByName(a: Exercise, b: Exercise) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
