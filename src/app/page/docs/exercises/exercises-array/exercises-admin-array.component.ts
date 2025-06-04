import {Component, input, OnChanges, OnDestroy, output, signal} from '@angular/core';
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Dictionary} from "../../../../shared/model/common/dictionary";
import {Subject} from "rxjs";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-exercises-array',
  imports: [
    ModalButtonComponent
  ],
  templateUrl: './exercises-admin-array.component.html'
})
export class ExercisesAdminArrayComponent implements OnChanges, OnDestroy {
  showDetails = signal<Dictionary<boolean>>({});

  readonly modalId = input.required<string>();
  readonly exercises = input.required<Exercise[]>();

  readonly actionExercise = output<FormIndicator>();

  private readonly unsubscribe$ = new Subject<void>();

  ngOnChanges(): void {
    this.exercises().forEach((exercise: Exercise) => this.showDetails.update(value =>
      ({
        ...value,
        [exercise.id]: false
      })));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expendExerciseDetails(id: number): void {
    let idKey: string = id.toString()
    this.showDetails.update(value => ({...value, [idKey]: !value[idKey]}));
  }

  showExerciseDetails(exercise: Exercise): void {
    this.actionExercise.emit({
      actionType: ActionEnum.read,
      object: exercise
    });
  }

  modifyExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionEnum.update,
      object: exercise
    });
  }

  delExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionEnum.delete,
      object: exercise
    });
  }

  getVisibleMuscles(exercise: Exercise): Muscle[] {
    const showAll = this.showDetails()[exercise.id];
    return showAll ? exercise.muscles : exercise.muscles?.slice(0, 2) || [];
  }

  shouldShowEllipsis(exercise: Exercise): boolean {
    const showAll = this.showDetails()[exercise.id];
    return !showAll && exercise.muscles?.length > 3;
  }
}
