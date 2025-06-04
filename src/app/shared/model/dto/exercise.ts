import {Muscle} from "./muscle";
import {ExerciseType} from "./exercise-type";
import {ProgExercise} from "./prog-exercise";

export interface Exercise {
  id: number
  name: string
  goal: string
  description: string
  muscles: Muscle[]
  exerciseTypes: ExerciseType[]
  progExercises: ProgExercise[]
}
