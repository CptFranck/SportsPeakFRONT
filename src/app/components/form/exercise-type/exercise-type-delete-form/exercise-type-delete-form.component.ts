import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-exercise-type-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './exercise-type-delete-form.component.html',
})
export class ExerciseTypeDeleteFormComponent implements OnInit, OnDestroy {

  @Input() exerciseType!: ExerciseType | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);

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
    if (!this.exerciseType) return;
    this.exerciseTypeService.deleteExerciseType(this.exerciseType);
    this.btnCloseRef.click();
  }
}
