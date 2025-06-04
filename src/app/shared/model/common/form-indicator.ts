import {ActionTypeEnum} from "../enum/action-type.enum";
import {ModificationFieldEnum} from "../enum/modification-field.enum";

export interface FormIndicator {
  actionType: ActionTypeEnum,
  modificationField?: ModificationFieldEnum,
  object: any
}
