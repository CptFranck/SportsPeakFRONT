import {Component, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {AlertComponent} from "../alert/alert.component";
import {NgForOf, NgIf} from "@angular/common";
import {Alert} from "../../interface/utils/alert";
import {AlertService} from "../../services/alert/alert.service";
import {Subject, takeUntil} from "rxjs";
import {DivSmoothHeightComponent} from "../div-smooth-height/div-smooth-height.component";

@Component({
  selector: 'app-alert-display',
  imports: [
    AlertComponent,
    NgForOf,
    NgIf,
    DivSmoothHeightComponent
  ],
  templateUrl: './alert-display.component.html',
})
export class AlertDisplayComponent implements OnInit, OnDestroy {
  alerts = signal<Alert[]>([]);

  displayMockAlertButton = input<boolean>(false);

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
