import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {TargetSet} from "../../../../interface/dto/target-set";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSetService} from "../../../../services/target-set/target-set.service";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-target-set-delete-form',
  templateUrl: './target-set-delete-form.component.html'
})
export class TargetSetDeleteFormComponent implements OnInit, OnDestroy {

  readonly targetSet = input.required<TargetSet | undefined>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly targetSetService = inject(TargetSetService);

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
    const targetSet = this.targetSet();
    if (!targetSet) return;
    this.targetSetService.deleteTargetSet(targetSet);
    this.btnCloseRef().click();
  }
}
