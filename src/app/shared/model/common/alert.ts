import {SourceLocation} from "graphql/language/location";
import {AlertType} from "../enum/alert-type";
import {AlertErrorType} from "../enum/alert-error-type";

export interface Alert {
  id: number;
  title: string;
  message: string;
  type: AlertType;
  closed: boolean;
  autoClose: boolean;
  errorInformation?: {
    errorType?: AlertErrorType;
    errorExtension?: { [key: string]: unknown },
    errorLocation?: ReadonlyArray<SourceLocation>,
    errorPath?: ReadonlyArray<string | number>,
  };
}

