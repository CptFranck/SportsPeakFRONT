import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Muscle} from "../../../../interface/dto/muscle";
import {Observable, Subject, takeUntil} from "rxjs";
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-muscle-delete-form',
  templateUrl: './muscle-delete-form.component.html'
})
export class MuscleDeleteFormComponent implements OnInit, OnDestroy {

  @Input() muscle!: Muscle | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly muscleService: MuscleService = inject(MuscleService);

  ngOnInit() {
    if (this.submitEventActionType$)
      this.submitEventActionType$
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
    if (!this.muscle) return;
    this.muscleService.deleteMuscle(this.muscle);
    this.btnCloseRef.click();
  }
}
