import {Exercise} from "./exercise";

export interface Muscle {
  id: number
  name: string
  latinName: string
  description: string
  function: string
  illustrationPath: string
  exercises: Exercise[]
}
