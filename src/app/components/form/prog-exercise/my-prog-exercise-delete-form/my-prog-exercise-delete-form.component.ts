import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";

@Component({
  selector: 'app-my-prog-exercise-delete-form',
  templateUrl: './my-prog-exercise-delete-form.component.html'
})
export class MyProgExerciseDeleteFormComponent implements OnInit, OnDestroy {

  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionTypeEnum> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly progExerciseService = inject(ProgExerciseService);

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
    const progExercise = this.progExercise();
    if (!progExercise) return;
    this.progExerciseService.deleteProgExercises(progExercise);
    this.btnCloseRef().click();
  }
}
