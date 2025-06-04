import {TargetSet} from "../shared/model/dto/target-set";
import {Dictionary} from "../shared/model/common/dictionary";
import {PerformanceLog} from "../shared/model/dto/performance-log";
import {stringToDateString} from "./time-functions";
import {DictionaryItem} from "../shared/model/common/dictionary-item";
import {ProgExercise} from "../shared/model/dto/prog-exercise";
import {getTargetSetLogs} from "./target-set-functions";
import {convertDictionaryToArray} from "./generic-function";


////////////////////////////////////// SORT FUNCTIONS ////////////////////////////////////////

export function sortPerformanceLogsByDictionaryDate(performanceLogs: PerformanceLog[]) {
  const dictionary: Dictionary<PerformanceLog[]> = {};
  performanceLogs.forEach((performanceLog: PerformanceLog) => {
    const key: string = stringToDateString(performanceLog.logDate);
    if (dictionary[key] === undefined) {
      dictionary[key] = [];
    }
    dictionary[key].push(performanceLog);
  })
  return convertDictionaryToArray(dictionary);
}

export function sortPerformanceLogsByDate(progExercise: ProgExercise, targetSet: TargetSet, useRelativeTargetSetInformationOnly: boolean = false) {
  return sortPerformanceLogsBy(progExercise, targetSet, true, useRelativeTargetSetInformationOnly);
}

export function sortPerformanceLogsBySet(progExercise: ProgExercise, targetSet: TargetSet, useRelativeTargetSetInformationOnly: boolean = false) {
  return sortPerformanceLogsBy(progExercise, targetSet, false, useRelativeTargetSetInformationOnly);
}

export function sortPerformanceLogsBy(
  progExercise: ProgExercise,
  targetSet: TargetSet,
  logDateTrueSetIndexFalse: boolean,
  useRelativeTargetSetInformationOnly: boolean = false
) {
  let performanceLogSortedDictionary: Dictionary<PerformanceLog[]> = {};

  let targetSetLogs: TargetSet[] = [];
  if (useRelativeTargetSetInformationOnly)
    targetSetLogs.push(targetSet)
  else
    targetSetLogs = getTargetSetLogs(targetSet, progExercise, true);

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
    const sortFunction = logDateTrueSetIndexFalse ? sortPerformanceLogsBySetIndex : sortPerformanceLogsByLogDate;
    performanceLogSet.value = performanceLogSet.value.sort(sortFunction)
    // invert sort type to be date/set or set/date
  })

  return performanceLogSortedDictionaryItem;
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
