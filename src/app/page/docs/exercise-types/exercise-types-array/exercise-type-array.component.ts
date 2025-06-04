import {Component, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Dictionary} from "../../../../shared/model/common/dictionary";
import {Subject} from "rxjs";
import {Exercise} from "../../../../shared/model/dto/exercise";

@Component({
  selector: 'app-exercise-type-array',
  imports: [
    ModalButtonComponent
  ],
  templateUrl: './exercise-type-array.component.html'
})
export class ExerciseTypeArrayComponent implements OnInit, OnDestroy {
  showDetails = signal<Dictionary<boolean>>({});

  readonly modalId = input.required<string>();
  readonly exerciseTypes = input.required<ExerciseType[]>();

  readonly actionExerciseType = output<FormIndicator>();

  private readonly unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.exerciseTypes().forEach((exerciseType: ExerciseType) => this.showDetails.update(value =>
      ({
        ...value,
        [exerciseType.id]: false
      })));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expendExerciseTypeDetails(id: number): void {
    let idKey: string = id.toString();
    this.showDetails.update(value => ({...value, [idKey]: !value[idKey]}));
  }

  showExerciseTypeDetails(exerciseType: ExerciseType): void {
    this.actionExerciseType.emit({
      actionType: ActionTypeEnum.read,
      object: exerciseType
    });
  }

  modifyExerciseType(exerciseType: ExerciseType) {
    this.actionExerciseType.emit({
      actionType: ActionTypeEnum.update,
      object: exerciseType
    });
  }

  delExerciseType(exerciseType: ExerciseType) {
    this.actionExerciseType.emit({
      actionType: ActionTypeEnum.delete,
      object: exerciseType
    });
  }

  getVisibleExercises(exerciseType: ExerciseType): Exercise[] {
    const show = this.showDetails()[exerciseType.id];
    return show ? exerciseType.exercises : exerciseType.exercises.slice(0, 2);
  }

  shouldShowEllipsis(exerciseType: ExerciseType): boolean {
    return exerciseType.exercises.length > 3;
  }
}
