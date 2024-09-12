import {TargetSet} from "../interface/dto/target-set";
import {Dictionary} from "../interface/utils/dictionary";
import {PerformanceLog} from "../interface/dto/performance-log";


////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function sortPerformanceLogsByLogDate(targetSet: TargetSet | undefined) {
  let sortedPerformanceLogs: Dictionary<PerformanceLog[]> = {};
  if (targetSet)
    targetSet.performanceLogs.forEach((performanceLog: PerformanceLog) => {
      const date: string = performanceLog.logDate.split('T')[0];
      if (sortedPerformanceLogs[date] === undefined) {
        sortedPerformanceLogs[date] = [];
      }
      sortedPerformanceLogs[date].push(performanceLog);
    })
  return sortPerformanceLogsBySet(sortedPerformanceLogs);
}

export function sortPerformanceLogsBySet(performanceLogs: Dictionary<PerformanceLog[]>) {
  Object.keys(performanceLogs).forEach((date: string) => {
    performanceLogs[date].sort(sortPerformanceLogsSetIndex);
  })
  return performanceLogs;
}

export function sortPerformanceLogsSetIndex(a: PerformanceLog, b: PerformanceLog) {
  if (a.setIndex > b.setIndex) return 1;
  if (a.setIndex < b.setIndex) return -1;
  return 0;
}
