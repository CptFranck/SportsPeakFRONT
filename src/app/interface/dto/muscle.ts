import {Exercise} from "./exercise";

export interface Muscle {
  id: string
  name: string
  description: string
  function: string
  exercises?: Exercise[]
}
