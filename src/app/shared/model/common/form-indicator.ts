import {ModificationFieldEnum} from "../enum/user-modification-field.enum";
import {ActionEnum} from "../enum/action.enum";

export interface FormIndicator {
  actionType: ActionEnum,
  modificationField?: ModificationFieldEnum,
  object: any
}
