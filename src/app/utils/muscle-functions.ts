import {Muscle} from "../interface/dto/muscle";

export function sortMuscleByName(a: Muscle, b: Muscle) {
  console.log(a.name, b.name)
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
