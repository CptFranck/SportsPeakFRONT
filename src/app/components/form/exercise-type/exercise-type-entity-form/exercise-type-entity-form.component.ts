import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {NgIf} from "@angular/common";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseSelectorComponent} from "../../../selectors/exercise-selector/exercise-selector.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
    selector: 'app-exercise-type-entity-form',
    imports: [
        InputControlComponent,
        ReactiveFormsModule,
        ExerciseSelectorComponent,
        NgIf
    ],
    templateUrl: './exercise-type-entity-form.component.html'
})
export class ExerciseTypeEntityFormComponent implements OnInit, OnDestroy {
  exerciseType: ExerciseType | undefined;
  exerciseTypeForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  isAdmin: boolean = false;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Subject<ActionType> | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);
  private readonly exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

  @Input() set exerciseTypeInput(value: ExerciseType | undefined) {
    this.exerciseType = value;
    this.initializeExerciseTypeForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() =>
        this.isAdmin = this.userLoggedService.isAdmin());
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.create || actionType === ActionType.update)
            this.onSubmit();
        });
    this.initializeExerciseTypeForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeExerciseTypeForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const exerciseTypeName: string = this.exerciseType ? this.exerciseType.name : "";
    const exerciseTypeGoal: string = this.exerciseType ? this.exerciseType.goal : "";
    const muscleExerciseIds: number[] = this.exerciseType?.exercises ?
      this.exerciseType.exercises?.map((ex: Exercise) => ex.id) : [];

    this.exerciseTypeForm = new FormGroup({
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

    if (this.exerciseType)
      this.exerciseTypeForm.addControl("id", new FormControl(this.exerciseType.id));
  }

  onSubmit() {
    if (!this.exerciseTypeForm) return;
    if (this.exerciseTypeForm.valid) {
      this.submitInvalidForm = false;
      if (!this.exerciseTypeForm.value.id) {
        this.exerciseTypeService.addExerciseType(this.exerciseTypeForm);
      } else {
        this.exerciseTypeService.modifyExerciseType(this.exerciseTypeForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
