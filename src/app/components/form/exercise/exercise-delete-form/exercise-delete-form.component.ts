import {Component, inject, OnDestroy, OnInit, input} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Exercise} from "../../../../interface/dto/exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-exercise-delete-form',
  templateUrl: './exercise-delete-form.component.html'
})
export class ExerciseDeleteFormComponent implements OnInit, OnDestroy {

  readonly exercise = input.required<Exercise | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Subject<ActionType> | undefined>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseService: ExerciseService = inject(ExerciseService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const exercise = this.exercise();
    if (!exercise) return;
    this.exerciseService.deleteExercise(exercise);
    this.btnCloseRef().click();
  }
}
