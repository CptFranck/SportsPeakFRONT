import {ProgExercise} from "./prog-exercise";
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
  creationDate: Date
  state: TargetSetState
  progExercise: ProgExercise
  targetSetUpdate: TargetSet
  performanceLogs: PerformanceLog[]
}
