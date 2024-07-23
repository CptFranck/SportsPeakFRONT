import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Muscle} from "../../../../../interface/dto/muscle";
import {Observable, Subject, takeUntil} from "rxjs";
import {MuscleService} from "../../../../../services/muscle/muscle.service";
import {ActionType} from "../../../../../enum/action-type";

@Component({
  selector: 'app-muscle-delete-form',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './muscle-delete-form.component.html',
})
export class muscleDeleteFormComponent implements OnInit, OnDestroy {

  @Input() muscle!: Muscle | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private muscleService: MuscleService = inject(MuscleService);

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
