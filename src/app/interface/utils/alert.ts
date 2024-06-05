import {AlertType} from "../../enum/alert-type";
import {AlertErrorType} from "../../enum/alert-error-type";
import {SourceLocation} from "graphql/language/location";

export interface Alert {
  id: number;
  title: string;
  message: string;
  type: AlertType;
  closed: boolean;
  errorInformation?: {
    errorName: string,
    errorStack?: string,
    errorType?: AlertErrorType,
    errorLocation?: ReadonlyArray<SourceLocation>,
    errorPath?: ReadonlyArray<string | number>,
    errorCause?: undefined,
  };
}

