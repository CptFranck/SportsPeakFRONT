import {WeightUnitEnum} from "../enum/weightUnit.enum";

export interface PerformanceLog {
  id: number
  setIndex: number
  repetitionNumber: number
  weight: number
  weightUnit: WeightUnitEnum
  logDate: string
}
