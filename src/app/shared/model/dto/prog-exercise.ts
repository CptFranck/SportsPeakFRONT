import {User} from "./user";
import {Exercise} from "./exercise";
import {TargetSet} from "./target-set";
import {VisibilityEnum} from "../enum/visibility.enum";
import {TrustLabelEnum} from "../enum/trustLabel.enum";

export interface ProgExercise {
  id: number
  name: string
  note: string
  visibility: VisibilityEnum
  trustLabel: TrustLabelEnum
  creator: User
  exercise: Exercise
  targetSets: TargetSet[]
}
