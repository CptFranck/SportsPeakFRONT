import {TargetSet} from "../interface/dto/target-set";
import {Dictionary} from "../interface/utils/dictionary";
import {PerformanceLog} from "../interface/dto/performance-log";
import {stringToDateString} from "./time-functions";
import {DictionaryArray} from "../interface/utils/dictionary-array";


////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function convertDictionaryToArray(performanceLogs: Dictionary<any[]>) {
  return Object.entries(performanceLogs).map((value: [string, any[]]): DictionaryArray<any> => {
    return {key: value[0], value: value[1]}
  })
}

export function sortPerformanceLogsByDictionary(targetSet: TargetSet) {
  let sortedPerformanceLogs: Dictionary<PerformanceLog[]> = {};
  targetSet.performanceLogs.forEach((performanceLog: PerformanceLog) => {
    const date: string = stringToDateString(performanceLog.logDate);
    if (sortedPerformanceLogs[date] === undefined) {
      sortedPerformanceLogs[date] = [];
    }
    sortedPerformanceLogs[date].push(performanceLog);
  })
  return sortPerformanceLogsBySet(sortedPerformanceLogs);
}

export function sortPerformanceLogsBySet(performanceLogs: Dictionary<PerformanceLog[]>) {
  Object.keys(performanceLogs).forEach((date: string) => {
    performanceLogs[date].sort(sortPerformanceLogsBySetIndex);
  });
  return performanceLogs;
}

export function filterPerformanceLogByDate(targetSet: TargetSet | undefined, logDate: string): PerformanceLog[] {
  let performanceLogThisDate: PerformanceLog[] = [];
  if (targetSet?.performanceLogs) {
    performanceLogThisDate = targetSet.performanceLogs.filter((performanceLog: PerformanceLog) => {
      const date: string = stringToDateString(performanceLog.logDate);
      return logDate === date;
    })
  }
  return performanceLogThisDate;
}

export function sortPerformanceLogsByLogDate(a: DictionaryArray<PerformanceLog[]>, b: DictionaryArray<PerformanceLog[]>) {
  const dateA: Date = new Date(a.key)
  const dateB: Date = new Date(a.key)
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
}

export function sortPerformanceLogsBySetIndex(a: PerformanceLog, b: PerformanceLog) {
  if (a.setIndex > b.setIndex) return 1;
  if (a.setIndex < b.setIndex) return -1;
  return 0;
}
