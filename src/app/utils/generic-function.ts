import {Dictionary} from "../interface/utils/dictionary";
import {DictionaryItem} from "../interface/utils/dictionary-item";

export function convertDictionaryToArray<T>(performanceLogs: Dictionary<T>): DictionaryItem<T>[] {
  return Object.entries(performanceLogs).map((value: [string, T]): DictionaryItem<T> => {
    return {key: value[0], value: value[1]}
  })
}
