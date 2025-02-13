import {AlertType} from "../enum/alert-type";
import {SourceLocation} from "graphql/language/location";
import {AlertErrorType} from "../enum/alert-error-type";

export interface Alert {
  id: number;
  title: string;
  message: string;
  type: AlertType;
  closed: boolean;
  errorInformation?: {
    errorType?: AlertErrorType;
    errorExtension?: { [key: string]: unknown },
    errorLocation?: ReadonlyArray<SourceLocation>,
    errorPath?: ReadonlyArray<string | number>,
  };
}

