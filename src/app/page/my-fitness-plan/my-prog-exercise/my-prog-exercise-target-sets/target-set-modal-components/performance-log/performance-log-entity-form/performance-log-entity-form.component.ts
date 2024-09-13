import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {TargetSet} from "../../../../../../../interface/dto/target-set";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PerformanceLog} from "../../../../../../../interface/dto/performance-log";
import {Observable, Subject, takeUntil} from "rxjs";
import {ActionType} from "../../../../../../../interface/enum/action-type";
import {WeightUnit} from "../../../../../../../interface/enum/weightUnit";
import {InputControlComponent} from "../../../../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {WeightSelectComponent} from "../../../../../../../components/selects/weight-select/weight-select.component";
import {
  PerformanceLogIndexSelectComponent
} from "../../../../../../../components/selects/performance-log-index-select/performance-log-index-select.component";
import {PerformanceLogService} from "../../../../../../../services/performance-log/performance-log.service";
import {filterPerformanceLogByDate} from "../../../../../../../utils/performance-log-functions";
import {stringToDateString} from "../../../../../../../utils/time-functions";

@Component({
  selector: 'app-performance-log-entity-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputControlComponent,
    NgIf,
    WeightSelectComponent,
    PerformanceLogIndexSelectComponent,
  ],
  templateUrl: './performance-log-entity-form.component.html',
})
export class PerformanceLogEntityFormComponent implements OnInit, OnDestroy {

  targetSet: TargetSet | undefined;
  selectTargetSet: TargetSet | undefined;
  performanceLog: PerformanceLog | undefined;
  performanceLogForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() actionType!: ActionType;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private performanceLogService: PerformanceLogService = inject(PerformanceLogService);

  @Input() set performanceLogInput(value: PerformanceLog | undefined) {
    this.performanceLog = value;
    this.initializeTargetSetForm();
  }

  @Input() set targetSetInput(value: TargetSet | undefined) {
    this.targetSet = value;
    this.initializeTargetSetForm();
  }

  ngOnInit() {
    this.initializeTargetSetForm();
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.addPerformance || actionType === ActionType.updatePerformance) {
            this.submit();
          }
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeTargetSetForm() {
    let logDate: string = new Date().toISOString().substring(0, 10);
    let performanceLogSetIndex: number = 1;
    let performanceLogRepetitionNumber: number = 1;
    let performanceLogWeight: number = 0;
    let targetSetId: number | undefined;
    let performanceLogWeightUnit: string = WeightUnit.KILOGRAMME;

    if (this.targetSet) {
      this.selectTargetSet = this.targetSet
      performanceLogRepetitionNumber = this.targetSet.repetitionNumber;
      performanceLogWeight = this.targetSet.weight;
      targetSetId = this.targetSet.id;
      performanceLogWeightUnit = this.targetSet.weightUnit;
      const performanceLogOfThisDay: PerformanceLog[] = filterPerformanceLogByDate(this.targetSet, logDate);
      if (performanceLogOfThisDay.length > 0)
        performanceLogSetIndex = performanceLogOfThisDay.length + 1;
    }
    if (this.performanceLog) {
      this.selectTargetSet = this.performanceLog.targetSet
      logDate = stringToDateString(this.performanceLog.logDate);
      performanceLogSetIndex = this.performanceLog.setIndex;
      performanceLogRepetitionNumber = this.performanceLog.repetitionNumber;
      performanceLogWeight = this.performanceLog.weight;
      targetSetId = this.performanceLog.targetSet.id;
      performanceLogWeightUnit = this.performanceLog.weightUnit;
    }

    this.performanceLogForm = new FormGroup(
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
    if (this.performanceLog)
      this.performanceLogForm.addControl("id", new FormControl(this.performanceLog.id));
  }

  submit() {
    if (!this.performanceLogForm) return;
    if (this.performanceLogForm.valid) {
      this.submitInvalidForm = false;
      this.performanceLogForm.controls["logDate"].setValue(new Date(this.performanceLogForm.controls["logDate"].value))
      if (!this.performanceLogForm.value.id) {
        this.performanceLogService.addPerformanceLog(this.performanceLogForm);
      } else {
        this.performanceLogService.modifyPerformanceLog(this.performanceLogForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
