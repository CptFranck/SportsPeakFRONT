import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {WeightSelectComponent} from "../../../selects/weight-select/weight-select.component";
import {DurationInputComponent} from "../../../input/duration-inputs/duration-input.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";
import {Duration} from "../../../../interface/dto/duration";
import {WeightUnit} from "../../../../interface/enum/weightUnit";
import {createDurationForm} from "../../../../utils/duration-functions";
import {getUpToDateTargetSets} from "../../../../utils/target-set-functions";

@Component({
  selector: 'app-target-set-entity-form',
  imports: [
    FormsModule,
    InputControlComponent,
    ReactiveFormsModule,
    WeightSelectComponent,
    DurationInputComponent,
  ],
  templateUrl: './target-set-entity-form.component.html'
})
export class TargetSetEntityFormComponent implements OnInit, OnDestroy {

  readonly targetSet = input.required<TargetSet | undefined>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly actionType = input.required<ActionType>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  targetSetForm = computed<FormGroup>(() => {
    const targetSet = this.targetSet();
    const progExercise = this.progExercise();

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
    const targetSetProgExerciseId: number | undefined = progExercise?.id;

    if (targetSet) {
      targetSetIndex = targetSet.index;
      targetSetSetNumber = targetSet.setNumber;
      targetSetRepetitionNumber = targetSet.repetitionNumber;
      targetSetWeight = targetSet.weight;
      targetSetWeightUnit = targetSet.weightUnit;
      targetSetPhysicalExertionUnitTime = targetSet.physicalExertionUnitTime;
      targetSetRestTime = targetSet.restTime;
      if (this.actionType() === ActionType.addEvolution)
        targetSetUpdateId = targetSet.id;
    } else if (progExercise)
      targetSetIndex = getUpToDateTargetSets(progExercise).length + 1;

    return new FormGroup(
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
  });

  submitInvalidForm = signal<boolean>(false);

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly targetSetService: TargetSetService = inject(TargetSetService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
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

  onCreateOrEvolutionSubmit() {
    const targetSetForm = this.targetSetForm();
    if (targetSetForm.valid) {
      this.submitInvalidForm.set(false);
      this.targetSetService.addTargetSet(targetSetForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }

  onUpdateSubmit() {
    const targetSetForm = this.targetSetForm();
    if (targetSetForm.valid) {
      const targetSet = this.targetSet();
      if (targetSet) {
        targetSetForm.addControl("id", new FormControl(targetSet.id));
        targetSetForm.removeControl("creationDate");
        targetSetForm.removeControl("progExerciseId");
        targetSetForm.removeControl("targetSetUpdateId");
      }
      this.submitInvalidForm.set(false);
      this.targetSetService.modifyTargetSet(targetSetForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
