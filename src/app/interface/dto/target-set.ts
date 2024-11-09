import {Duration} from "./duration";
import {PerformanceLog} from "./performance-log";
import {TargetSetState} from "../enum/targetSetState";

export interface TargetSet {
  id: number
  index: number
  setNumber: number
  repetitionNumber: number
  weight: number
  weightUnit: string
  physicalExertionUnitTime: Duration
  restTime: Duration
  creationDate: string
  state: TargetSetState
  targetSetUpdate: TargetSet
  performanceLogs: PerformanceLog[]
}
