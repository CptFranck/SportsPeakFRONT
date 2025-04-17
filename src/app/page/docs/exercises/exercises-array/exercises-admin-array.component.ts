import {Component, input, OnChanges, OnDestroy, output, signal} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {Subject} from "rxjs";

@Component({
  selector: 'app-exercises-array',
  imports: [
    NgForOf,
    NgIf,
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
      actionType: ActionType.read,
      object: exercise
    });
  }

  modifyExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionType.update,
      object: exercise
    });
  }

  delExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionType.delete,
      object: exercise
    });
  }
}
