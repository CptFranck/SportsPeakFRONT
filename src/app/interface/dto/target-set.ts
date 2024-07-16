import {ProgExercise} from "./prog-exercise";
import {Duration} from "./duration";
import {PerformanceLog} from "./performance-log";

export interface TargetSet {
  id: number
  setNumber: number
  repetitionNumber: number
  weight: number
  weightUnit: string
  physicalExertionUnitTime: Duration
  restTime: Duration
  creationDate: Date
  progExercise: ProgExercise
  targetSetUpdate: TargetSet
  performanceLogs: PerformanceLog[]
}
