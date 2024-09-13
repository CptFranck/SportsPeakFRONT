import {TargetSet} from "../interface/dto/target-set";
import {Dictionary} from "../interface/utils/dictionary";
import {PerformanceLog} from "../interface/dto/performance-log";
import {stringToDateString} from "./time-functions";


////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function sortPerformanceLogsByDictionary(targetSet: TargetSet | undefined) {
  let sortedPerformanceLogs: Dictionary<PerformanceLog[]> = {};
  if (targetSet) {
    targetSet.performanceLogs.forEach((performanceLog: PerformanceLog) => {
      const date: string = stringToDateString(performanceLog.logDate);
      if (sortedPerformanceLogs[date] === undefined) {
        sortedPerformanceLogs[date] = [];
      }
      sortedPerformanceLogs[date].push(performanceLog);
    })
  }
  return sortPerformanceLogsBySet(sortedPerformanceLogs);
}

export function sortPerformanceLogsBySet(performanceLogs: Dictionary<PerformanceLog[]>) {
  Object.keys(performanceLogs).forEach((date: string) => {
    performanceLogs[date].sort(sortPerformanceLogsBySetIndex);
  })
  return performanceLogs;
}

export function sortPerformanceLogsByLogDate(a: [string, PerformanceLog[]], b: [string, PerformanceLog[]]) {
  const dateA: Date = new Date(a[0])
  const dateB: Date = new Date(b[0])
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
}

export function sortPerformanceLogsBySetIndex(a: PerformanceLog, b: PerformanceLog) {
  if (a.setIndex > b.setIndex) return 1;
  if (a.setIndex < b.setIndex) return -1;
  return 0;
}
