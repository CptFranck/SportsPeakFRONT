import {User} from "./user";
import {Exercise} from "./exercise";
import {TargetSet} from "./target-set";
import {Visibility} from "../enum/visibility";
import {TrustLabel} from "../enum/trust-label";

export interface ProgExercise {
  id: number
  name: string
  note: string
  visibility: Visibility
  trustLabel: TrustLabel
  creator: User
  exercise: Exercise
  targetSets: TargetSet[]
}
