export interface InputNewExercise {
  name: string
  goal: string
  description: string
  muscleIds: number[]
  exerciseTypeIds: number[]
}

export interface InputExercise extends InputNewExercise {
  id: string
}
