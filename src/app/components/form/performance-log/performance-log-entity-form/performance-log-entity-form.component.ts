import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {TargetSet} from "../../../../shared/model/dto/target-set";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PerformanceLog} from "../../../../shared/model/dto/performance-log";
import {Observable, Subject, takeUntil} from "rxjs";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {WeightUnitEnum} from "../../../../shared/model/enum/weightUnit.enum";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {WeightSelectComponent} from "../../../selects/weight-select/weight-select.component";
import {
  PerformanceLogIndexSelectComponent
} from "../../../selects/performance-log-index-select/performance-log-index-select.component";
import {PerformanceLogService} from "../../../../core/services/performance-log/performance-log.service";
import {filterPerformanceLogByDate} from "../../../../utils/performance-log-functions";
import {stringToDateString} from "../../../../utils/time-functions";

@Component({
  selector: 'app-performance-log-entity-form',
  imports: [
    ReactiveFormsModule,
    InputControlComponent,
    WeightSelectComponent,
    PerformanceLogIndexSelectComponent,
  ],
  templateUrl: './performance-log-entity-form.component.html'
})
export class PerformanceLogEntityFormComponent implements OnInit, OnDestroy {

  readonly targetSet = input.required<TargetSet | undefined>();
  readonly performanceLog = input.required<PerformanceLog | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionTypeEnum> | undefined>();

  readonly performanceLogForm = computed<FormGroup>(() => {
    const targetSet = this.targetSet();
    const performanceLog = this.performanceLog();

    let logDate: string = new Date().toISOString().substring(0, 10);
    let performanceLogSetIndex: number = 1;
    let performanceLogRepetitionNumber: number = 1;
    let performanceLogWeight: number = 0;
    let targetSetId: number | undefined;
    let performanceLogWeightUnit: string = WeightUnitEnum.KILOGRAMME;

    if (targetSet) {
      performanceLogRepetitionNumber = targetSet.repetitionNumber;
      performanceLogWeight = targetSet.weight;
      targetSetId = targetSet.id;
      performanceLogWeightUnit = targetSet.weightUnit;
      const performanceLogOfThisDay: PerformanceLog[] = filterPerformanceLogByDate(targetSet, logDate);
      if (performanceLogOfThisDay.length > 0)
        performanceLogSetIndex = performanceLogOfThisDay.length + 1;
    }
    if (performanceLog) {
      logDate = stringToDateString(performanceLog.logDate);
      performanceLogSetIndex = performanceLog.setIndex;
      performanceLogRepetitionNumber = performanceLog.repetitionNumber;
      performanceLogWeight = performanceLog.weight;
      performanceLogWeightUnit = performanceLog.weightUnit;
    }

    const performanceLogForm: FormGroup = new FormGroup(
      {
        setIndex: new FormControl(
          performanceLogSetIndex,
          [Validators.required,
            Validators.min(1),
            Validators.max(50),
            Validators.pattern("^[0-9]*$")]),
        repetitionNumber: new FormControl(
          performanceLogRepetitionNumber,
          [Validators.required,
            Validators.min(1),
            Validators.max(1000),
            Validators.pattern("^[0-9]*$")]),
        weight: new FormControl(
          performanceLogWeight,
          [Validators.required,
            Validators.min(0),
            Validators.max(1000),
            Validators.pattern("^[0-9]+(.[0-9]{1,2})?$")]),
        weightUnit: new FormControl(
          performanceLogWeightUnit,
          [Validators.required]
        ),
        logDate: new FormControl(
          logDate,
          [Validators.required]),
        targetSetId: new FormControl(targetSetId),
      });
    if (performanceLog)
      performanceLogForm.addControl("id", new FormControl(performanceLog.id));

    return performanceLogForm;
  });

  submitInvalidForm = signal<boolean>(false);

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly performanceLogService: PerformanceLogService = inject(PerformanceLogService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionTypeEnum) => {
          if (actionType === ActionTypeEnum.create || actionType === ActionTypeEnum.update) {
            this.submit();
          }
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit() {
    const performanceLogForm = this.performanceLogForm();
    if (performanceLogForm.valid) {
      this.submitInvalidForm.set(false);
      if (!performanceLogForm.value.id) {
        this.performanceLogService.addPerformanceLog(performanceLogForm);
      } else {
        this.performanceLogService.modifyPerformanceLog(performanceLogForm);
      }
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
