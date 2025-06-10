import {Duration} from "./duration";
import {PerformanceLog} from "./performance-log";
import {TargetSetState} from "../enum/target-set-state";
import {WeightUnit} from "../enum/weight-unit";

export interface TargetSet {
  id: number
  index: number
  setNumber: number
  repetitionNumber: number
  weight: number
  weightUnit: WeightUnit
  physicalExertionUnitTime: Duration
  restTime: Duration
  creationDate: string
  state: TargetSetState
  targetSetUpdate: TargetSet | null
  performanceLogs: PerformanceLog[]
}
