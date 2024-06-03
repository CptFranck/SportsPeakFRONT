import {Alert} from "../../interface/utils/alert";
import {AlertType} from "../../enum/alert-type";

export function createSuccessAlert(alerts: Alert[], alertId: number, message: string): void {
  alerts.push({
    id: alertId,
    title: "Successful operation",
    message: message,
    type: AlertType.success
  })
  alertId += 1;
}

export function setAlertError(alerts: Alert[], alertId: number, message: string) {
  alerts.push({
    id: alertId,
    title: "Unsuccessful operation",
    message: message,
    type: AlertType.error
  })
  alertId += 1;
}
