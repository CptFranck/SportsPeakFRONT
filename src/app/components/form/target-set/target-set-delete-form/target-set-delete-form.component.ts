import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {TargetSet} from "../../../../interface/dto/target-set";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSetService} from "../../../../services/target-set/target-set.service";

@Component({
  selector: 'app-target-set-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './target-set-delete-form.component.html',
})
export class TargetSetDeleteFormComponent implements OnInit, OnDestroy {

  @Input() targetSet!: TargetSet | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private targetSetService: TargetSetService = inject(TargetSetService);

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
    if (!this.targetSet) return;
    this.targetSetService.deleteTargetSet(this.targetSet);
    this.btnCloseRef.click();
  }
}
