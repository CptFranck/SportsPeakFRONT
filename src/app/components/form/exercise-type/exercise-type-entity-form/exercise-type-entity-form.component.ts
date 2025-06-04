import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {ExerciseSelectorComponent} from "../../../selectors/exercise-selector/exercise-selector.component";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";

@Component({
  selector: 'app-exercise-type-entity-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    ExerciseSelectorComponent
  ],
  templateUrl: './exercise-type-entity-form.component.html'
})
export class ExerciseTypeEntityFormComponent implements OnInit, OnDestroy {
  isAdmin = false;

  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly exerciseType = input.required<ExerciseType | undefined>();
  readonly submitEventActionType$ = input.required<Subject<ActionType> | undefined>();

  exerciseTypeForm = computed<FormGroup>(() => {
    const exerciseIdsValidator = this.isAdmin ? null : Validators.required;

    const exerciseType = this.exerciseType()
    const exerciseTypeName: string = exerciseType ? exerciseType.name : "";
    const exerciseTypeGoal: string = exerciseType ? exerciseType.goal : "";
    const muscleExerciseIds: number[] = exerciseType?.exercises ? exerciseType.exercises?.map((ex: Exercise) => ex.id) : [];

    const exerciseTypeForm: FormGroup = new FormGroup({
      name: new FormControl(exerciseTypeName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      goal: new FormControl(
        exerciseTypeGoal,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      exerciseIds: new FormControl(
        muscleExerciseIds, exerciseIdsValidator
      ),
    });

    if (exerciseType)
      exerciseTypeForm.addControl("id", new FormControl(exerciseType.id));

    return exerciseTypeForm;
  });
  submitInvalidForm = signal<boolean>(false);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userLoggedService = inject(UserLoggedService);
  private readonly exerciseTypeService = inject(ExerciseTypeService);


  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() =>
        this.isAdmin = this.userLoggedService.isAdmin());
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.create || actionType === ActionType.update)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const exerciseTypeForm = this.exerciseTypeForm();
    if (exerciseTypeForm.valid) {
      this.submitInvalidForm.set(false);
      if (!exerciseTypeForm.value.id) {
        this.exerciseTypeService.addExerciseType(exerciseTypeForm);
      } else {
        this.exerciseTypeService.modifyExerciseType(exerciseTypeForm);
      }
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
