export interface InputNewMuscle {
  name: string
  description: string
  function: string
  exerciseIds: number[]
}

export interface InputMuscle extends InputNewMuscle {
  id: string
}
