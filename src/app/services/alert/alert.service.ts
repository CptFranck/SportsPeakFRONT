import {Injectable} from '@angular/core';
import {Alert} from "../../interface/utils/alert";
import {AlertType} from "../../enum/alert-type";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertId: number = 0;
  private alerts: Alert[] = [];
  private alertsObservable: Subject<Alert[]> = new Subject<Alert[]>();

  constructor() {
    this.updateAlert()
  }

  updateAlert() {
    this.alertsObservable.next(this.alerts.filter(al => !al.closed));
  }

  getAlerts(): Subject<Alert[]> {
    return this.alertsObservable;
  }

  getAllAlert() {
    return this.alerts;
  }

  createSuccessAlert(message: string): void {
    this.alerts.push({
      id: this.alertId,
      title: "Successful operation :D",
      message: message,
      type: AlertType.success,
      closed: false
    });
    this.alertId += 1;
    this.updateAlert()
  }

  createWarningAlert(message: string): void {
    this.alerts.push({
      id: this.alertId,
      title: "Unsuccessful operation :(",
      message: message,
      type: AlertType.error,
      closed: false
    });
    this.alertId += 1;
    this.updateAlert()
  }

  createErrorAlert(message: string): void {
    this.alerts.push({
      id: this.alertId,
      title: "Unsuccessful operation :(",
      message: message,
      type: AlertType.error,
      closed: false
    });
    this.updateAlert()
    this.alertId += 1;
  }

  closeAlert(alert: Alert) {
    let localAlert = this.alerts.find(al => alert.id === al.id);
    if (localAlert) {
      localAlert.closed = true;
      this.updateAlert()
    }
  }
}
