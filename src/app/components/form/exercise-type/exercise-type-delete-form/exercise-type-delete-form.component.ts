import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";

@Component({
  selector: 'app-exercise-type-delete-form',
  templateUrl: './exercise-type-delete-form.component.html'
})
export class ExerciseTypeDeleteFormComponent implements OnInit, OnDestroy {

  readonly exerciseType = input.required<ExerciseType | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionTypeEnum> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly exerciseTypeService = inject(ExerciseTypeService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionTypeEnum) => {
          if (actionType === ActionTypeEnum.delete)
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
