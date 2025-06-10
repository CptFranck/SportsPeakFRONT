import {WeightUnit} from "../enum/weight-unit";

export interface PerformanceLog {
  id: number
  setIndex: number
  repetitionNumber: number
  weight: number
  weightUnit: WeightUnit
  logDate: string
}
