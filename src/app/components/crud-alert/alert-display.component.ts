import {Component, inject} from '@angular/core';
import {AlertComponent} from "../alert/alert.component";
import {NgForOf} from "@angular/common";
import {Alert} from "../../interface/utils/alert";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-alert-display',
  standalone: true,
  imports: [
    AlertComponent,
    NgForOf
  ],
  templateUrl: './alert-display.component.html',
})
export class AlertDisplayComponent {
  alerts!: Alert[];
  alertService: AlertService = inject(AlertService);

  constructor() {
    this.alerts = this.alertService.getAlerts();
  }

  removeAlert(event: Alert) {
    this.alerts.filter(alert => alert.id === event.id);
  }


}
