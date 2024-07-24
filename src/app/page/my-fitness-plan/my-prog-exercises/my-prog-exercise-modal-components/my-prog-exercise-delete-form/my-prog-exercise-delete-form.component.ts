import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ProgExerciseService} from "../../../../../services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../../interface/enum/action-type";

@Component({
  selector: 'app-my-prog-exercise-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './my-prog-exercise-delete-form.component.html',
})
export class MyProgExerciseDeleteFormComponent implements OnInit, OnDestroy {

  @Input() progExercise!: ProgExercise | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private progExerciseService: ProgExerciseService = inject(ProgExerciseService);

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
    if (!this.progExercise) return;
    this.progExerciseService.deleteProgExercises(this.progExercise);
    this.btnCloseRef.click();
  }
}
