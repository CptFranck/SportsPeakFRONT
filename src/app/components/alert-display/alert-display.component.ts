import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AlertComponent} from "../alert/alert.component";
import {NgForOf} from "@angular/common";
import {Alert} from "../../interface/utils/alert";
import {AlertService} from "../../services/alert/alert.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-alert-display',
  standalone: true,
  imports: [
    AlertComponent,
    NgForOf
  ],
  templateUrl: './alert-display.component.html',
})
export class AlertDisplayComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();
  private alertService: AlertService = inject(AlertService);

  ngOnInit() {
    this.alertService.getAlertsSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((alerts: Alert[]) => {
        this.alerts = alerts;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeAlert(alert: Alert) {
    this.alertService.closeAlert(alert);
  }
}
