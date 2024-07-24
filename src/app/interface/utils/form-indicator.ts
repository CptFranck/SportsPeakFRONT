import {ActionType} from "../enum/action-type";
import {ModificationField} from "../enum/modification-field";

export interface FormIndicator {
  actionType: ActionType,
  modificationField?: ModificationField,
  object: any
}
