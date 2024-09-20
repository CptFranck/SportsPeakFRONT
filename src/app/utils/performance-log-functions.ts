import {TargetSet} from "../interface/dto/target-set";
import {Dictionary} from "../interface/utils/dictionary";
import {PerformanceLog} from "../interface/dto/performance-log";
import {stringToDateString} from "./time-functions";
import {DictionaryItem} from "../interface/utils/dictionary-item";
import {ProgExercise} from "../interface/dto/prog-exercise";
import {getTargetSetLogs} from "./target-set-functions";
import {convertDictionaryToArray} from "./generic-function";


////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function sortPerformanceLogsBy(progExercise: ProgExercise, targetSet: TargetSet, logDateTrueSetIndexFalse: boolean) {
  let performanceLogSortedDictionary: Dictionary<PerformanceLog[]> = {};
  const targetSetLogs: TargetSet[] = getTargetSetLogs(targetSet, progExercise, true);

  targetSetLogs.forEach((localTargetSet: TargetSet) => {
    localTargetSet.performanceLogs.forEach((performanceLog: PerformanceLog) => {
      const key: string = logDateTrueSetIndexFalse ?
        stringToDateString(performanceLog.logDate) : performanceLog.setIndex.toString()
      if (performanceLogSortedDictionary[key] === undefined) {
        performanceLogSortedDictionary[key] = [];
      }
      performanceLogSortedDictionary[key].push(performanceLog);
    })
  })

  const performanceLogSortedDictionaryItem: DictionaryItem<PerformanceLog[]>[] =
    convertDictionaryToArray(performanceLogSortedDictionary);

  if (logDateTrueSetIndexFalse) {
    performanceLogSortedDictionaryItem.sort(sortDictionaryItemArrayByKeyDate)
  }

  performanceLogSortedDictionaryItem.forEach((performanceLogSet: DictionaryItem<PerformanceLog[]>) => {
    performanceLogSet.value = performanceLogSet.value.sort(
      logDateTrueSetIndexFalse ? sortPerformanceLogsBySetIndex : sortPerformanceLogsByLogDate);
    // invert sort type to be date/set or set/date
  })

  return performanceLogSortedDictionaryItem;
}

export function sortPerformanceLogsByDate(progExercise: ProgExercise, targetSet: TargetSet) {
  return sortPerformanceLogsBy(progExercise, targetSet, true);
}

export function sortPerformanceLogsBySet(progExercise: ProgExercise, targetSet: TargetSet) {
  return sortPerformanceLogsBy(progExercise, targetSet, false);
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

export function sortDictionaryItemArrayByKeyDate(a: DictionaryItem<any>, b: DictionaryItem<any>) {
  const dateA: Date = new Date(a.key)
  const dateB: Date = new Date(b.key)
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
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
