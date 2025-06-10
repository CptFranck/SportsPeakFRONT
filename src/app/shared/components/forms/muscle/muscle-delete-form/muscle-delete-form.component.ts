import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Muscle} from "../../../../model/dto/muscle";
import {Observable, Subject, takeUntil} from "rxjs";
import {MuscleService} from "../../../../../core/services/muscle/muscle.service";
import {ActionType} from "../../../../model/enum/action-type";

@Component({
  selector: 'app-muscle-delete-form',
  templateUrl: './muscle-delete-form.component.html'
})
export class MuscleDeleteFormComponent implements OnInit, OnDestroy {

  readonly muscle = input.required<Muscle | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly muscleService: MuscleService = inject(MuscleService);

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
    const muscle = this.muscle();
    if (!muscle) return;
    this.muscleService.deleteMuscle(muscle);
    this.btnCloseRef().click();
  }
}
