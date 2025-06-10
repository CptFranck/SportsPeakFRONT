import {ModificationFieldEnum} from "../enum/user-modification-field";
import {ActionType} from "../enum/action-type";

export interface FormIndicator {
  actionType: ActionType,
  modificationField?: ModificationFieldEnum,
  object: any
}
