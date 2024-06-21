import {Injectable} from '@angular/core';
import {Alert} from "../../interface/utils/alert";
import {AlertType} from "../../enum/alert-type";
import {Subject} from "rxjs";
import {GraphQLError} from "graphql/error";
import {AlertErrorType} from "../../enum/alert-error-type";
import {NetworkError} from "@apollo/client/errors";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertId: number = 0;
  private alerts: Alert[] = [];
  private alertsSubject: Subject<Alert[]> = new Subject<Alert[]>();

  constructor() {
    this.updateAlert();
  }

  getAlertsSubject(): Subject<Alert[]> {
    return this.alertsSubject;
  }

  getAllAlert() {
    return this.alerts;
  }

  addSuccessAlert(message: string): void {
    const successAlert: Alert = this.createAlert("Successful operation :D", message, AlertType.success);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  addWarningAlert(message: string): void {
    const successAlert: Alert = this.createAlert("Warning :/", message, AlertType.warning);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  addErrorAlert(message: string): void {
    const successAlert: Alert = this.createAlert("Unsuccessful operation :(", message, AlertType.error);
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

  graphQLErrorAlertHandler(graphQLErrors: readonly GraphQLError[]): void {
    graphQLErrors.map((err: GraphQLError) =>
      this.createGraphQLErrorAlert(err));
  }

  createNetWorkErrorAlert(networkError: NetworkError): void {
    if (!networkError) return
    let networkAlert: Alert = this.createErrorAlert(networkError)
    if (networkAlert.errorInformation) {
      networkAlert.errorInformation["errorType"] = AlertErrorType.NetworkError;
    }
    this.alerts.push(networkAlert);
    this.updateAlert()
    this.alertId += 1;
  }

  private updateAlert() {
    this.alertsSubject.next(this.alerts.filter((alert: Alert) => !alert.closed));
  }

  private createAlert(title: string, message: string, alertType: AlertType): Alert {
    const alert: Alert = {
      id: this.alertId,
      title: title,
      message: message,
      type: alertType,
      closed: false
    }
    this.alertId += 1;
    return alert;
  }

  private createGraphQLErrorAlert(graphQLError: GraphQLError): void {
    let graphQLAlert: Alert = this.createErrorAlert(graphQLError)
    if (graphQLAlert.errorInformation) {
      graphQLAlert.errorInformation["errorType"] = AlertErrorType.GraphQLError;
      graphQLAlert.errorInformation["errorLocation"] = graphQLError.locations;
      graphQLAlert.errorInformation["errorPath"] = graphQLError.path;
    }
    this.alerts.push(graphQLAlert);
    this.updateAlert();
    this.alertId += 1;
  }

  private createErrorAlert(error: Error): Alert {
    const errorAlert: Alert = this.createAlert("Unsuccessful operation :(", error.message, AlertType.error);
    errorAlert.errorInformation = {
      errorName: error.name,
      errorStack: error.stack,
    }
    return errorAlert;
  }
}
