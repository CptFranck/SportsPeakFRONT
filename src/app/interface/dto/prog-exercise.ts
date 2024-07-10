import {User} from "./user";
import {Exercise} from "./exercise";
import {TargetSet} from "./target-set";

export interface ProgExercise {
  id: string
  name: string
  note: string
  visibility: string
  trustLabel: string
  creator: User
  exercise: Exercise
  targetSets: TargetSet[]
}
