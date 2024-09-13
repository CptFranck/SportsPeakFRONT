import {PerformanceLog} from "../dto/performance-log";

export interface PerformanceLogDictionary {
  keyDate: string,
  perfLogsOfKeyDate: PerformanceLog[],
}
