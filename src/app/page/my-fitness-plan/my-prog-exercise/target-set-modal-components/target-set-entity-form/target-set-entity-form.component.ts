import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ExerciseSelectComponent} from "../../../../../components/selects/exercise-select/exercise-select.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputControlComponent} from "../../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {
  VisibilitySelectComponent
} from "../../../../../components/selects/visibility-select/visibility-select.component";
import {Observable, Subject, takeUntil} from "rxjs";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {WeightUnit} from "../../../../../interface/enum/weightUnit";
import {Duration} from "../../../../../interface/dto/duration";
import {ActionType} from "../../../../../enum/action-type";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {WeightSelectComponent} from "../../../../../components/selects/weight-select/weight-select.component";
import {DurationInputComponent} from "../../../../../components/input/duration-inputs/duration-input.component";
import {createDurationForm} from "../../../../../utils/duration-functions";
import {TargetSetService} from "../../../../../services/target-set/target-set.service";

@Component({
  selector: 'app-target-set-entity-form',
  standalone: true,
  imports: [
    ExerciseSelectComponent,
    FormsModule,
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    VisibilitySelectComponent,
    WeightSelectComponent,
    DurationInputComponent,
  ],
  templateUrl: './target-set-entity-form.component.html',
})
export class TargetSetEntityFormComponent implements OnInit, OnDestroy {
  targetSet: TargetSet | undefined;
  progExercise: ProgExercise | undefined;
  targetSetForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() actionType!: ActionType;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private targetSetService: TargetSetService = inject(TargetSetService);

  @Input() set progExerciseInput(value: ProgExercise | undefined) {
    this.progExercise = value;
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
          if (actionType === ActionType.create || actionType === ActionType.addEvolution)
            this.onCreateOrEvolutionSubmit();
          else if (actionType === ActionType.update)
            this.onUpdateSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeTargetSetForm() {
    const defaultDuration: Duration = {seconds: 0, minutes: 0, hours: 0};

    const targetSetIndex: number = this.targetSet ? this.targetSet.index :
      (this.progExercise ? this.progExercise.targetSets.length + 1 : 1);
    const targetSetSetNumber: number = this.targetSet ? this.targetSet.setNumber : 1;
    const targetSetRepetitionNumber: number = this.targetSet ? this.targetSet.repetitionNumber : 1;
    const targetSetWeight: number = this.targetSet ? this.targetSet.weight : 0;
    const targetSetWeightUnit: string = this.targetSet ? this.targetSet.weightUnit : WeightUnit.KILOGRAMME;

    const targetSetPhysicalExertionUnitTime: Duration = this.targetSet ?
      this.targetSet.physicalExertionUnitTime : defaultDuration;
    const targetSetRestTime: Duration = this.targetSet ? this.targetSet.restTime : defaultDuration;

    const targetSetDate: Date = new Date();
    const targetSetUpdateId: number | null = this.targetSet && this.actionType === ActionType.addEvolution ?
      this.targetSet.id : null;
    const targetSetProgExerciseId: number | undefined = this.progExercise?.id;

    this.targetSetForm = new FormGroup(
      {
        index: new FormControl(
          targetSetIndex,
          [Validators.required,
            Validators.min(1),
            Validators.max(50),
            Validators.pattern("^[0-9]*$")]),
        setNumber: new FormControl(
          targetSetSetNumber,
          [Validators.required,
            Validators.min(0),
            Validators.max(1000),
            Validators.pattern("^[0-9]*$")]
        ),
        repetitionNumber: new FormControl(
          targetSetRepetitionNumber,
          [Validators.required,
            Validators.min(1),
            Validators.max(1000),
            Validators.pattern("^[0-9]*$")]),
        weight: new FormControl(
          targetSetWeight,
          [Validators.required,
            Validators.min(0),
            Validators.max(1000),
            Validators.pattern("^[0-9]+(.[0-9]{1,2})?$")]),
        weightUnit: new FormControl(
          targetSetWeightUnit,
          [Validators.required]
        ),
        physicalExertionUnitTime: createDurationForm(targetSetPhysicalExertionUnitTime),
        restTime: createDurationForm(targetSetRestTime),
        creationDate: new FormControl(targetSetDate),
        progExerciseId: new FormControl(targetSetProgExerciseId),
        targetSetUpdateId: new FormControl(targetSetUpdateId),
      });
  }

  onCreateOrEvolutionSubmit() {
    if (!this.targetSetForm) return;
    if (this.targetSetForm.valid) {
      this.submitInvalidForm = false;
      this.targetSetService.addTargetSet(this.targetSetForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }

  onUpdateSubmit() {
    if (!this.targetSetForm) return;
    if (this.targetSetForm.valid) {
      if (this.targetSet) {
        this.targetSetForm.addControl("id", new FormControl(this.targetSet.id));
        this.targetSetForm.removeControl("creationDate");
        this.targetSetForm.removeControl("progExerciseId");
        this.targetSetForm.removeControl("targetSetUpdateId");
      }
      this.submitInvalidForm = false;
      this.targetSetService.modifyTargetSet(this.targetSetForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
