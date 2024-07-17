import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {ExerciseSelectComponent} from "../../../../../components/selects/exercise-select/exercise-select.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputControlComponent} from "../../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {
  VisibilitySelectComponent
} from "../../../../../components/selects/visibility-select/visibility-select.component";
import {Observable, Subscription} from "rxjs";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {WeightUnit} from "../../../../../interface/enum/weightUnit";
import {Duration} from "../../../../../interface/dto/duration";
import {TargetSetService} from "../../../../../services/target-set/target-set.service";
import {ActionType} from "../../../../../enum/action-type";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {WeightSelectComponent} from "../../../../../components/selects/weight-select/weight-select.component";

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
    WeightSelectComponent
  ],
  templateUrl: './target-set-entity-form.component.html',
})
export class TargetSetEntityFormComponent implements OnInit, AfterViewInit {
  targetSet: TargetSet | undefined;
  targetSetForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() actionType!: ActionType;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;
  @Input() progExercise: ProgExercise | undefined;

  private targetSetService: TargetSetService = inject(TargetSetService);

  @Input() set targetSetInput(value: TargetSet | undefined) {
    this.targetSet = value;
    this.initializeTargetSetForm();
  }

  ngOnInit() {
    this.initializeTargetSetForm();
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeTargetSetForm() {
    const defaultDuration: Duration =
      {seconds: 0, minutes: 0, hours: 0};
    const targetSetIndex: number = this.targetSet ? this.targetSet.index : 1;
    const targetSetSetNumber: number = this.targetSet ? this.targetSet.setNumber : 1;
    const targetSetRepetitionNumber: number = this.targetSet ? this.targetSet.repetitionNumber : 1;
    const targetSetWeight: number = this.targetSet ? this.targetSet.repetitionNumber : 1;
    const targetSetWeightUnit: string = this.targetSet ? this.targetSet.weightUnit : WeightUnit.KILOGRAMME;
    const targetSetPhysicalExertionUnitTime: Duration = this.targetSet ? this.targetSet.physicalExertionUnitTime : defaultDuration;
    const targetSetRestTime: Duration = this.targetSet ? this.targetSet.restTime : defaultDuration;
    const targetSetDate: Date = this.targetSet ? new Date(this.targetSet.creationDate) : new Date();
    const targetSetUpdateId: number | null = this.targetSet ?
      (this.actionType === ActionType.addEvolution ?
        this.targetSet.id : this.targetSet.targetSetUpdate ? this.targetSet.targetSetUpdate.id : null) : null;
    const targetSetProgExerciseId: number | null = this.progExercise ? this.progExercise.id : null;

    this.targetSetForm = new FormGroup({
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
      physicalExertionUnitTime: new FormControl(
        targetSetPhysicalExertionUnitTime,
        [Validators.required]
      ),
      restTime: new FormControl(
        targetSetRestTime,
        [Validators.required]
      ),
      creationDate: new FormControl(targetSetDate, [Validators.required]),
      progExerciseId: new FormControl(targetSetProgExerciseId, [Validators.required]),
      targetSetUpdateId: new FormControl(targetSetUpdateId),
    });

    if (this.targetSet) {
      this.targetSetForm.addControl("id", new FormControl(this.targetSet.id));
      this.targetSetForm.removeControl("creationDate");
      this.targetSetForm.removeControl("progExerciseId");
      this.targetSetForm.removeControl("targetSetUpdateId");
    }
  }

  onSubmit() {
    if (!this.targetSetForm) return;
    if (this.targetSetForm.valid) {
      this.submitInvalidForm = false;
      if (!this.targetSetForm.value.id) {
        this.targetSetService.addTargetSet(this.targetSetForm);
      } else {
        this.targetSetService.modifyTargetSet(this.targetSetForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
