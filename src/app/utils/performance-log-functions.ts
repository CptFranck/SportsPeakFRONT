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
  return sortedPerformanceLogs;
}
