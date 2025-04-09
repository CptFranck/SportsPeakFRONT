import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {Subject, takeUntil} from "rxjs";
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseSelectorComponent} from "../../../selectors/exercise-selector/exercise-selector.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-muscle-entity-form',
  imports: [
    ExerciseSelectorComponent,
    ReactiveFormsModule,
    InputControlComponent
  ],
  templateUrl: './muscle-entity-form.component.html'
})
export class MuscleEntityFormComponent implements OnInit, OnDestroy {

  readonly muscle = input.required<Muscle | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Subject<ActionType> | undefined>();

  submitInvalidForm = signal<boolean>(false);

  private isAdmin = false;

  readonly muscleForm = computed<FormGroup>(() => {
    const exerciseIdsValidator = this.isAdmin ? null : Validators.required;

    const muscle = this.muscle();
    const muscleName: string = muscle ? muscle.name : "";
    const muscleDescription: string = muscle ? muscle.description : "";
    const muscleFunction: string = muscle ? muscle.function : "";
    const muscleExerciseIds: number[] = muscle?.exercises ? muscle.exercises?.map((ex: Exercise) => ex.id) : [];

    const muscleForm: FormGroup = new FormGroup({
      name: new FormControl(muscleName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      description: new FormControl(
        muscleDescription,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      function: new FormControl(
        muscleFunction,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000)]),
      exerciseIds: new FormControl(
        muscleExerciseIds, exerciseIdsValidator
      ),
    });

    if (muscle)
      muscleForm.addControl("id", new FormControl(muscle.id));

    return muscleForm;
  });

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly muscleService: MuscleService = inject(MuscleService);
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);

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
          if (actionType === ActionType.create || actionType === ActionType.update) {
            this.onSubmit();
          }
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const muscleForm = this.muscleForm();
    if (muscleForm.valid) {
      this.submitInvalidForm.set(false);
      if (!muscleForm.value.id)
        this.muscleService.addMuscle(muscleForm);
      else
        this.muscleService.modifyMuscle(muscleForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
