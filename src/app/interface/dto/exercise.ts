import {Muscle} from "./muscle";
import {ExerciseType} from "./exerciseType";

export interface Exercise {
  id: string
  name: string
  goal: string
  description: string
  muscles?: Muscle[]
  exerciseTypes?: ExerciseType[]
}
