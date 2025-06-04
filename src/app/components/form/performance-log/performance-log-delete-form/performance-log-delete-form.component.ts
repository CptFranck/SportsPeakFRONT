import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {PerformanceLog} from "../../../../shared/model/dto/performance-log";
import {PerformanceLogService} from "../../../../core/services/performance-log/performance-log.service";

@Component({
  selector: 'app-performance-log-delete-form',
  templateUrl: './performance-log-delete-form.component.html'
})
export class PerformanceLogDeleteFormComponent implements OnInit, OnDestroy {
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly performanceLog = input.required<PerformanceLog | undefined>();
  readonly submitEventActionType$ = input.required<Observable<ActionTypeEnum> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly performanceLogService = inject(PerformanceLogService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionTypeEnum) => {
          if (actionType === ActionTypeEnum.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const performanceLog = this.performanceLog();
    if (!performanceLog) return;
    this.performanceLogService.deletePerformanceLog(performanceLog);
    this.btnCloseRef().click();
  }
}
