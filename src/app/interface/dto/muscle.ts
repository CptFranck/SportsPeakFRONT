import {Exercise} from "./exercise";

export interface Muscle {
  id: number
  name: string
  description: string
  function: string
  exercises: Exercise[]
}
