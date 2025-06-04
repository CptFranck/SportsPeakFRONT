import {Muscle} from "../shared/model/dto/muscle";

export function sortMuscleByName(a: Muscle, b: Muscle) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
