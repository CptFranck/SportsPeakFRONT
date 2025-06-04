import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {MuscleSelectorComponent} from "../../../selectors/muscle-selector/muscle-selector.component";
import {
  ExerciseTypeSelectorComponent
} from "../../../selectors/exercise-type-selector/exercise-type-selector.component";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-exercise-entity-form',
  imports: [
    FormsModule,
    InputControlComponent,
    ReactiveFormsModule,
    MuscleSelectorComponent,
    ExerciseTypeSelectorComponent
  ],
  templateUrl: './exercise-entity-form.component.html'
})
export class ExerciseEntityFormComponent implements OnInit, OnDestroy {
  isAdmin = false;

  readonly exercise = input.required<Exercise | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Subject<ActionEnum> | undefined>();

  readonly exerciseForm = computed<FormGroup>(() => {
    const exerciseIdsValidator = this.isAdmin ? null : Validators.required;
    const exercise = this.exercise();
    const exerciseName: string = exercise ? exercise.name : "";
    const exerciseDescription: string = exercise ? exercise.description : "";
    const exerciseGoal: string = exercise ? exercise.goal : "";
    const exerciseMuscleIds: number[] = exercise?.muscles ?
      exercise.muscles?.map((muscle: Muscle) => muscle.id) : [];
    const exerciseExerciseTypeIds: number [] = exercise ?
      exercise.exerciseTypes?.map((exerciseType: ExerciseType) => exerciseType.id) : [];

    let exerciseForm: FormGroup = new FormGroup({
      name: new FormControl(exerciseName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      description: new FormControl(
        exerciseDescription,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      goal: new FormControl(
        exerciseGoal,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      muscleIds: new FormControl(
        exerciseMuscleIds, exerciseIdsValidator
      ),
      exerciseTypeIds: new FormControl(
        exerciseExerciseTypeIds, exerciseIdsValidator
      ),
    });

    if (exercise)
      exerciseForm.addControl("id", new FormControl(exercise.id));

    return exerciseForm;
  });

  submitInvalidForm = signal<boolean>(false);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseService = inject(ExerciseService);
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionEnum) => {
          if (actionType === ActionEnum.create || actionType === ActionEnum.update)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const exerciseForm = this.exerciseForm();
    if (exerciseForm.valid) {
      this.submitInvalidForm.set(false);
      if (!exerciseForm.value.id) {
        this.exerciseService.addExercise(exerciseForm);
      } else {
        this.exerciseService.modifyExercise(exerciseForm);
      }
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
