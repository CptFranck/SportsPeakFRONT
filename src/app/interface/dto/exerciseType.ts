import {Exercise} from "./exercise";

export interface ExerciseType {
  id: string
  name: string
  goal: string
  exercises?: Exercise[]
}
