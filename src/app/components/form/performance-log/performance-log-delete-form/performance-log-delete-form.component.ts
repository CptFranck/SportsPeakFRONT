import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ActionType} from "../../../../interface/enum/action-type";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {PerformanceLogService} from "../../../../services/performance-log/performance-log.service";

@Component({
  selector: 'app-performance-log-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './performance-log-delete-form.component.html',
})
export class PerformanceLogDeleteFormComponent implements OnInit, OnDestroy {
  performanceLog: PerformanceLog | undefined;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private performanceLogService: PerformanceLogService = inject(PerformanceLogService);

  @Input() set performanceLogInput(performanceLog: PerformanceLog | undefined) {
    this.performanceLog = performanceLog;
  }

  ngOnInit() {
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (!this.performanceLog) return;
    this.performanceLogService.deletePerformanceLog(this.performanceLog);
    this.btnCloseRef.click();
  }
}
