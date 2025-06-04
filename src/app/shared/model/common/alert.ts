import {AlertTypeEnum} from "../enum/alert-type.enum";
import {SourceLocation} from "graphql/language/location";
import {AlertErrorTypeEnum} from "../enum/alert-error-type.enum";

export interface Alert {
  id: number;
  title: string;
  message: string;
  type: AlertTypeEnum;
  closed: boolean;
  autoClose: boolean;
  errorInformation?: {
    errorType?: AlertErrorTypeEnum;
    errorExtension?: { [key: string]: unknown },
    errorLocation?: ReadonlyArray<SourceLocation>,
    errorPath?: ReadonlyArray<string | number>,
  };
}

