import {Muscle} from "./muscle";
import {ExerciseType} from "./exerciseType";
import {ProgExercise} from "./prog-exercise";

export interface Exercise {
  id: string
  name: string
  goal: string
  description: string
  muscles: Muscle[]
  exerciseTypes: ExerciseType[]
  progExercises: ProgExercise[]
}
