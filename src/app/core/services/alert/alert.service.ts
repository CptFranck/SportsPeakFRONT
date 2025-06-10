import {Injectable} from '@angular/core';
import {Alert} from "../../../shared/model/common/alert";
import {Subject} from "rxjs";
import {GraphQLFormattedError} from "graphql/error";
import {NetworkError} from "@apollo/client/errors";
import {AlertTypeEnum} from "../../../shared/model/enum/alert.enum";
import {AlertErrorEnum} from "../../../shared/model/enum/alert-error.enum";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertId = 0;
  private readonly alertList: Alert[] = [];
  private readonly alertListSubject = new Subject<Alert[]>();

  constructor() {
    this.updateAlert();
  }

  get alertList$() {
    return this.alertListSubject.asObservable();
  }

  addSuccessAlert(message: string) {
    const successAlert: Alert = this.createBaseAlert("Successful operation :D", message, AlertTypeEnum.success);
    this.alertList.push(successAlert);
    this.updateAlert();
  }

  addWarningAlert(message: string) {
    const successAlert: Alert = this.createBaseAlert("Warning :/", message, AlertTypeEnum.warning);
    this.alertList.push(successAlert);
    this.updateAlert();
  }

  addErrorAlert(message: string) {
    const successAlert: Alert = this.createBaseAlert("Unsuccessful operation :(", message, AlertTypeEnum.error);
    this.alertList.push(successAlert);
    this.updateAlert();
  }

  closeAlert(alert: Alert) {
    let localAlert: Alert | undefined = this.alertList.find((al: Alert) => alert.id === al.id);
    if (localAlert) {
      localAlert.closed = true;
      this.updateAlert();
    }
  }

  ///////////// APOLLO / GRAPHQL /////////////

  graphQLErrorAlertHandler(graphQLErrors: ReadonlyArray<GraphQLFormattedError>) {
    graphQLErrors.map((err: GraphQLFormattedError) => this.createGraphQLErrorAlert(err));
  }

  createNetWorkErrorAlert(networkError: NetworkError) {
    const lastAlert = this.alertList.at(-1);
    if (!networkError) return;
    if (lastAlert !== undefined && this.isSameAlertError(lastAlert, networkError)) return;
    const networkAlert: Alert = this.createErrorAlert(networkError, false);
    if (networkAlert.errorInformation)
      networkAlert.errorInformation.errorType = AlertErrorEnum.NetworkError;
    this.alertList.push(networkAlert);
    this.updateAlert();
    this.alertId += 1;
  }

  private createGraphQLErrorAlert(graphQLError: GraphQLFormattedError) {
    const graphQLAlert = this.createErrorAlert(graphQLError);
    if (graphQLAlert.errorInformation) {
      graphQLAlert.errorInformation.errorType = AlertErrorEnum.GraphQLError;
      graphQLAlert.errorInformation.errorLocation = graphQLError.locations;
      graphQLAlert.errorInformation.errorPath = graphQLError.path;
    }
    this.alertList.push(graphQLAlert);
    this.updateAlert();
    this.alertId += 1;
  }

  private updateAlert() {
    this.alertListSubject.next(this.alertList.filter((alert: Alert) => !alert.closed));
  }

  private createErrorAlert(error: GraphQLFormattedError, autoClose = true): Alert {
    const errorAlert = this.createBaseAlert("Unsuccessful operation :(", error.message, AlertTypeEnum.error, autoClose);
    errorAlert.errorInformation = {
      errorExtension: error.extensions,
      errorLocation: error.locations,
      errorPath: error.path,
    }
    return errorAlert;
  }

  private createBaseAlert(title: string, message: string, alertType: AlertTypeEnum, autoClose: boolean = true): Alert {
    const alert = {
      id: this.alertId,
      title: title,
      message: message,
      type: alertType,
      closed: false,
      autoClose: autoClose
    }
    this.alertId += 1;
    return alert;
  }

  private isSameAlertError(alert: Alert, error: GraphQLFormattedError): boolean {
    return alert?.message === error.message ||
      alert?.errorInformation?.errorPath === error.path ||
      alert?.errorInformation?.errorLocation === error.locations ||
      alert?.errorInformation?.errorExtension === error.extensions;
  }
}
