import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-exercise-type-delete-form',
  templateUrl: './exercise-type-delete-form.component.html'
})
export class ExerciseTypeDeleteFormComponent implements OnInit, OnDestroy {

  readonly exerciseType = input.required<ExerciseType | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseTypeService = inject(ExerciseTypeService);

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
    const exerciseType = this.exerciseType();
    if (!exerciseType) return;
    this.exerciseTypeService.deleteExerciseType(exerciseType);
    this.btnCloseRef().click();
  }
}
