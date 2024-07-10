import {TargetSet} from "./target-set";

export interface PerformanceLog {
  id: number
  setIndex: number
  repetitionNumber: number
  weight: number
  weightUnit: string
  logDate: Date
  targetSet: TargetSet
}
