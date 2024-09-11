import {TargetSet} from "../interface/dto/target-set";
import {Dictionary} from "../interface/utils/dictionary";
import {PerformanceLog} from "../interface/dto/performance-log";

export function sortPerformanceLogsByLogDate(targetSet: TargetSet | undefined) {
  let sortedPerformanceLogs: Dictionary<PerformanceLog[]> = {};
  if (targetSet)
    targetSet.performanceLogs.forEach((performanceLog: PerformanceLog) => {
      const date: string = new Date(performanceLog.logDate).toISOString().substring(0, 10);
      sortedPerformanceLogs[date].push(performanceLog);
    })
  return sortedPerformanceLogs;
}
