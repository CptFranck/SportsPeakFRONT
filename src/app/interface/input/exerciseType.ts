export interface InputNewExerciseType {
  name: string
  goal: string
  exerciseIs: number[]
}

export interface InputExerciseType extends InputNewExerciseType {
  id: string
}
