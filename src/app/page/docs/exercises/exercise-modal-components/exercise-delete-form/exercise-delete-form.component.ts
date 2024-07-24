import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Exercise} from "../../../../../interface/dto/exercise";
import {ExerciseService} from "../../../../../services/exercise/exercise.service";
import {ActionType} from "../../../../../interface/enum/action-type";

@Component({
  selector: 'app-exercise-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './exercise-delete-form.component.html',
})
export class ExerciseDeleteFormComponent implements OnInit, OnDestroy {

  @Input() exercise!: Exercise | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Subject<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private exerciseService: ExerciseService = inject(ExerciseService);

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
    if (!this.exercise) return;
    this.exerciseService.deleteExercise(this.exercise);
    this.btnCloseRef.click();
  }
}
