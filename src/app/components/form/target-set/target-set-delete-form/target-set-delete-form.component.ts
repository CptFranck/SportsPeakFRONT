import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
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

  @Input() targetSet!: TargetSet | undefined;
  @Input() progExercise!: ProgExercise | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly targetSetService: TargetSetService = inject(TargetSetService);

  ngOnInit() {
    console.log(this.targetSet)
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
    if (!this.targetSet) return;
    this.targetSetService.deleteTargetSet(this.targetSet);
    this.btnCloseRef.click();
  }
}
