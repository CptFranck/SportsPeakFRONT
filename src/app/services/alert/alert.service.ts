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
    this.updateAlert()
  }

  updateAlert() {
    this.alertsSubject.next(this.getAllAlert().filter(al => !al.closed));
  }

  getAlertsSubject(): Subject<Alert[]> {
    return this.alertsSubject;
  }

  getAllAlert() {
    return this.alerts;
  }

  createAlert(title: string, message: string, alertType: AlertType): Alert {
    const alert = {
      id: this.alertId,
      title: title,
      message: message,
      type: alertType,
      closed: false
    }
    this.alertId += 1;
    return alert;
  }

  addSuccessAlert(message: string): void {
    const successAlert = this.createAlert("Successful operation :D", message, AlertType.success);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  addWarningAlert(message: string): void {
    const successAlert = this.createAlert("Warning :/", message, AlertType.warning);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  addErrorAlert(message: string): void {
    const successAlert = this.createAlert("Unsuccessful operation :(", message, AlertType.error);
    this.alerts.push(successAlert);
    this.updateAlert();
  }

  closeAlert(alert: Alert) {
    let localAlert = this.alerts.find(al => alert.id === al.id);
    if (localAlert) {
      localAlert.closed = true;
      this.updateAlert();
    }
  }

  ///////////// APOLLO / GRAPHQL /////////////

  createErrorAlert(error: Error): Alert {
    const errorAlert = this.createAlert("Unsuccessful operation :(", error.message, AlertType.error);
    errorAlert.errorInformation = {
      errorName: error.name,
      errorStack: error.stack,
    }
    return errorAlert;
  }

  createGraphQLErrorAlert(graphQLError: GraphQLError): void {
    let graphQLAlert = this.createErrorAlert(graphQLError)
    if (graphQLAlert.errorInformation) {
      graphQLAlert.errorInformation["errorType"] = AlertErrorType.GraphQLError
      graphQLAlert.errorInformation["errorLocation"] = graphQLError.locations
      graphQLAlert.errorInformation["errorPath"] = graphQLError.path
    }
    this.alerts.push(graphQLAlert);
    this.updateAlert()
    this.alertId += 1;
  }

  createNetWorkErrorAlert(networkError: NetworkError): void {
    if (!networkError) return
    let networkAlert = this.createErrorAlert(networkError)
    if (networkAlert.errorInformation) {
      networkAlert.errorInformation["errorType"] = AlertErrorType.NetworkError
    }
    this.alerts.push(networkAlert);
    this.updateAlert()
    this.alertId += 1;
  }
}
