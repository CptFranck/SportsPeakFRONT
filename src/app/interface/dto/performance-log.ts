import {WeightUnit} from "../enum/weightUnit";

export interface PerformanceLog {
  id: number
  setIndex: number
  repetitionNumber: number
  weight: number
  weightUnit: WeightUnit
  logDate: string
}
