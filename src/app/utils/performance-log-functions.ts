import {TargetSet} from "../interface/dto/target-set";
import {Dictionary} from "../interface/utils/dictionary";
import {PerformanceLog} from "../interface/dto/performance-log";
import {stringToDateString} from "./time-functions";
import {DictionaryItem} from "../interface/utils/dictionary-item";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {getTargetSetLogs} from "./target-set-functions";
import {convertDictionaryToArray} from "./generic-function";


////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function sortPerformanceLogsByDictionaryDate(targetSet: TargetSet) {
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

export function sortAllPerformanceLogsBySet(progExercise: ProgExercise, targetSet: TargetSet) {
  const performanceLogSortedBySet: Dictionary<PerformanceLog[]> = {};
  const targetSetLogs: TargetSet[] = getTargetSetLogs(targetSet, progExercise, true);

  targetSetLogs.forEach((targetSet: TargetSet) => {
    targetSet.performanceLogs.forEach((performanceLog: PerformanceLog) => {
      const setIndex: string = performanceLog.setIndex.toString();
      if (performanceLogSortedBySet[setIndex] === undefined) {
        performanceLogSortedBySet[setIndex] = [];
      }
      performanceLogSortedBySet[setIndex].push(performanceLog);
    })
  });

  const performanceLogSortedBySetAndByLogDate: DictionaryItem<PerformanceLog[]>[] =
    convertDictionaryToArray(performanceLogSortedBySet);

  performanceLogSortedBySetAndByLogDate.forEach((performanceLogSet: DictionaryItem<PerformanceLog[]>) => {
    performanceLogSet.value = performanceLogSet.value.sort(sortPerformanceLogsByLogDate);
  })
  return performanceLogSortedBySetAndByLogDate;
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

export function sortDictionaryArrayOfPerformanceLogsByLogDate(a: DictionaryItem<PerformanceLog[]>, b: DictionaryItem<PerformanceLog[]>) {
  const dateA: Date = new Date(a.key)
  const dateB: Date = new Date(b.key)
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
}

export function sortPerformanceLogsBySetIndex(a: PerformanceLog, b: PerformanceLog) {
  if (a.setIndex > b.setIndex) return 1;
  if (a.setIndex < b.setIndex) return -1;
  return 0;
}

export function sortPerformanceLogsByLogDate(a: PerformanceLog, b: PerformanceLog) {
  const dateA: Date = new Date(a.logDate)
  const dateB: Date = new Date(b.logDate)
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
}
