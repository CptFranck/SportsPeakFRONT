import {Component, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {Alert} from "../../shared/model/common/alert";
import {AlertService} from "../../core/services/alert/alert.service";
import {Subject, takeUntil} from "rxjs";
import {AlertComponent} from "../alert/alert.component";
import {collapseHeight} from "../../shared/animations/collapseHeigh";

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

  private readonly unsubscribe$ = new Subject<void>();
  private readonly alertService = inject(AlertService);

  ngOnInit() {
    this.alertService.alertList$
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
