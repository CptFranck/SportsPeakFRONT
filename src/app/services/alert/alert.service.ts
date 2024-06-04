import {Injectable} from '@angular/core';
import {Alert} from "../../interface/utils/alert";
import {AlertType} from "../../enum/alert-type";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alerts: Alert[] = [];
  private alertId: number = 0;

  getAlerts(): Alert[] {
    return this.alerts;
  }

  createSuccessAlert(message: string): void {
    this.alerts.push({
      id: this.alertId,
      title: "Successful operation :D",
      message: message,
      type: AlertType.success
    });
    this.alertId += 1;
  }

  createWarningAlert(message: string): void {
    this.alerts.push({
      id: this.alertId,
      title: "Unsuccessful operation :(",
      message: message,
      type: AlertType.error
    });
    this.alertId += 1;
  }

  createErrorAlert(message: string): void {
    this.alerts.push({
      id: this.alertId,
      title: "Unsuccessful operation :(",
      message: message,
      type: AlertType.error
    });
    this.alertId += 1;
  }
}
