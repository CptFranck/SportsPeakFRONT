import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Observable, Subject, takeUntil} from "rxjs";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {WeightSelectComponent} from "../../../selects/weight-select/weight-select.component";
import {DurationInputComponent} from "../../../input/duration-inputs/duration-input.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSetService} from "../../../../services/target-set/target-set.service";
import {Duration} from "../../../../interface/dto/duration";
import {WeightUnit} from "../../../../interface/enum/weightUnit";
import {createDurationForm} from "../../../../utils/duration-functions";
import {getUpToDateTargetSets} from "../../../../utils/target-set-functions";

@Component({
  selector: 'app-target-set-entity-form',
  imports: [
    FormsModule,
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    WeightSelectComponent,
    DurationInputComponent,
  ],
  templateUrl: './target-set-entity-form.component.html'
})
export class TargetSetEntityFormComponent implements OnInit, OnDestroy {
  targetSet: TargetSet | undefined;
  progExercise: ProgExercise | undefined;
  targetSetForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() actionType!: ActionType;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly targetSetService: TargetSetService = inject(TargetSetService);

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
    let targetSetIndex: number = 1;
    let targetSetSetNumber: number = 1;
    let targetSetRepetitionNumber: number = 1;
    let targetSetWeight: number = 0;
    let targetSetWeightUnit: WeightUnit = WeightUnit.KILOGRAMME;
    let targetSetPhysicalExertionUnitTime: Duration = defaultDuration;
    let targetSetRestTime: Duration = defaultDuration;
    const targetSetDate: Date = new Date();
    let targetSetUpdateId: number | null = null;
    const targetSetProgExerciseId: number | undefined = this.progExercise?.id;

    if (this.targetSet) {
      targetSetIndex = this.targetSet.index;
      targetSetSetNumber = this.targetSet.setNumber;
      targetSetRepetitionNumber = this.targetSet.repetitionNumber;
      targetSetWeight = this.targetSet.weight;
      targetSetWeightUnit = this.targetSet.weightUnit;
      targetSetPhysicalExertionUnitTime = this.targetSet.physicalExertionUnitTime;
      targetSetRestTime = this.targetSet.restTime;
      if (this.actionType === ActionType.addEvolution)
        targetSetUpdateId = this.targetSet.id;
    } else if (this.progExercise)
      targetSetIndex = getUpToDateTargetSets(this.progExercise).length + 1;

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
