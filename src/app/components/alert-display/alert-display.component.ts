import {Component, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {Alert} from "../../interface/utils/alert";
import {AlertService} from "../../core/services/alert/alert.service";
import {Subject, takeUntil} from "rxjs";
import {AlertComponent} from "../alert/alert.component";
import {collapseHeight} from "../../animation/collapseHeigh";

@Component({
  selector: 'app-alert-display',
  imports: [
    AlertComponent,
  ],
  templateUrl: './alert-display.component.html',
  animations: [collapseHeight]
})
export class AlertDisplayComponent implements OnInit, OnDestroy {
  alerts = signal<Alert[]>([]);

  displayMockAlertButton = input<boolean>(false);

  protected readonly alert = alert;
  private readonly unsubscribe$ = new Subject<void>();
  private readonly alertService = inject(AlertService);

  ngOnInit() {
    this.alertService.getAlertsSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((alerts: Alert[]) => {
        this.alerts.set(alerts);
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createAlert() {
    this.alertService.addWarningAlert("Alert has been created.");
  }

  removeAlert(alert: Alert) {
    this.alertService.closeAlert(alert);
  }
}
