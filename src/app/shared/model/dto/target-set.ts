import {Duration} from "./duration";
import {PerformanceLog} from "./performance-log";
import {TargetSetStateEnum} from "../enum/targetSetState.enum";
import {WeightUnitEnum} from "../enum/weightUnit.enum";

export interface TargetSet {
  id: number
  index: number
  setNumber: number
  repetitionNumber: number
  weight: number
  weightUnit: WeightUnitEnum
  physicalExertionUnitTime: Duration
  restTime: Duration
  creationDate: string
  state: TargetSetStateEnum
  targetSetUpdate: TargetSet | null
  performanceLogs: PerformanceLog[]
}
