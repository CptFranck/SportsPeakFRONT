import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-performance-log-entity-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputControlComponent,
    NgIf,
    WeightSelectComponent,
    PerformanceLogIndexSelectComponent
  ],
  templateUrl: './performance-log-entity-form.component.html',
})
export class PerformanceLogEntityFormComponent implements OnInit, OnDestroy {

  performanceLog: PerformanceLog | undefined;
  targetSet: TargetSet | undefined;
  performanceLogForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() actionType!: ActionType;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();

  // private performanceLogService: PerformanceLogService = inject(PerformanceLogService);

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
          if (actionType === ActionType.addPerformance)
            this.onCreateOrEvolutionSubmit();
          // else if (actionType === ActionType.update)
          //   this.onUpdateSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeTargetSetForm() {
    const performanceLogSetIndex: number = 1;
    const performanceLogRepetitionNumber: number | undefined = this.targetSet?.repetitionNumber;
    const performanceLogWeight: number | undefined = this.targetSet?.weight;
    const performanceLogWeightUnit: string = this.targetSet ? this.targetSet.weightUnit : WeightUnit.KILOGRAMME;
    const logDate: Date = new Date();
    const targetSetId: number | undefined = this.targetSet?.id;

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
        logDate: new FormControl(logDate),
        targetSetId: new FormControl(targetSetId),
      });
  }

  onCreateOrEvolutionSubmit() {
    if (!this.performanceLogForm) return;
    if (this.performanceLogForm.valid) {
      this.submitInvalidForm = false;
      // this.performanceLogService.addTargetSet(this.targetSetForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }

  // onUpdateSubmit() {
  //   if (!this.targetSetForm) return;
  //   if (this.targetSetForm.valid) {
  //     if (this.targetSet) {
  //       this.targetSetForm.addControl("id", new FormControl(this.targetSet.id));
  //       this.targetSetForm.removeControl("creationDate");
  //       this.targetSetForm.removeControl("progExerciseId");
  //       this.targetSetForm.removeControl("targetSetUpdateId");
  //     }
  //     this.submitInvalidForm = false;
  //     this.performanceLogService.modifyTargetSet(this.targetSetForm);
  //     this.btnCloseRef.click();
  //   } else {
  //     this.submitInvalidForm = true;
  //   }
  // }
}
