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
  private readonly alerts: Alert[] = [];
  private readonly alertsSubject = new Subject<Alert[]>();

  constructor() {
    this.updateAlert();
  }

  getAlertsSubject(): Subject<Alert[]> {
    return this.alertsSubject;
  }

  getAllAlert() {
    return this.alerts;
  }

  addSuccessAlert(message: string) {
    const successAlert: Alert = this.createAlert("Successful operation :D", message, AlertTypeEnum.success);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  addWarningAlert(message: string) {
    const successAlert: Alert = this.createAlert("Warning :/", message, AlertTypeEnum.warning);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  addErrorAlert(message: string) {
    const successAlert: Alert = this.createAlert("Unsuccessful operation :(", message, AlertTypeEnum.error);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  closeAlert(alert: Alert) {
    let localAlert: Alert | undefined = this.alerts.find((al: Alert) => alert.id === al.id);
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
    const lastAlert = this.alerts.at(-1);
    if (!networkError) return;
    if (lastAlert !== undefined && this.isSameAlertError(lastAlert, networkError)) return;
    const networkAlert: Alert = this.createErrorAlert(networkError, false);
    if (networkAlert.errorInformation)
      networkAlert.errorInformation.errorType = AlertErrorEnum.NetworkError;
    this.alerts.push(networkAlert);
    this.updateAlert();
    this.alertId += 1;
  }

  private updateAlert() {
    this.alertsSubject.next(this.alerts.filter((alert: Alert) => !alert.closed));
  }

  private createAlert(title: string, message: string, alertType: AlertTypeEnum, autoClose: boolean = true): Alert {
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

  private createGraphQLErrorAlert(graphQLError: GraphQLFormattedError) {
    const graphQLAlert = this.createErrorAlert(graphQLError);
    if (graphQLAlert.errorInformation) {
      graphQLAlert.errorInformation.errorType = AlertErrorEnum.GraphQLError;
      graphQLAlert.errorInformation.errorLocation = graphQLError.locations;
      graphQLAlert.errorInformation.errorPath = graphQLError.path;
    }
    this.alerts.push(graphQLAlert);
    this.updateAlert();
    this.alertId += 1;
  }

  private createErrorAlert(error: GraphQLFormattedError, autoClose = true): Alert {
    const errorAlert = this.createAlert("Unsuccessful operation :(", error.message, AlertTypeEnum.error, autoClose);
    errorAlert.errorInformation = {
      errorExtension: error.extensions,
      errorLocation: error.locations,
      errorPath: error.path,
    }
    return errorAlert;
  }

  private isSameAlertError(alert: Alert, error: GraphQLFormattedError): boolean {
    return alert?.message === error.message ||
      alert?.errorInformation?.errorPath === error.path ||
      alert?.errorInformation?.errorLocation === error.locations ||
      alert?.errorInformation?.errorExtension === error.extensions;
  }
}
