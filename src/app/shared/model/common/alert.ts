import {SourceLocation} from "graphql/language/location";
import {AlertTypeEnum} from "../enum/alert.enum";
import {AlertErrorEnum} from "../enum/alert-error.enum";

export interface Alert {
  id: number;
  title: string;
  message: string;
  type: AlertTypeEnum;
  closed: boolean;
  autoClose: boolean;
  errorInformation?: {
    errorType?: AlertErrorEnum;
    errorExtension?: { [key: string]: unknown },
    errorLocation?: ReadonlyArray<SourceLocation>,
    errorPath?: ReadonlyArray<string | number>,
  };
}

