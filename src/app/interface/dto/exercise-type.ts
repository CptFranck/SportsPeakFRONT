import {Exercise} from "./exercise";

export interface ExerciseType {
  id: number
  name: string
  goal: string
  exercises: Exercise[]
}
