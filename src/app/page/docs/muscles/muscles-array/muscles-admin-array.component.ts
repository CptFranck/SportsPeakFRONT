import {Component, input, OnChanges, OnDestroy, output, signal} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Muscle} from "../../../../interface/dto/muscle";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {Subject} from "rxjs";
import {collapseHeight} from "../../../../animation/collapseHeigh";
import {rotateIcon} from "../../../../animation/rotateIcon";

@Component({
  selector: 'app-muscles-array',
  imports: [
    NgForOf,
    ModalButtonComponent,
    NgClass,
    NgIf,

  ],
  templateUrl: './muscles-admin-array.component.html',
  animations: [collapseHeight, rotateIcon]
})
export class MusclesAdminArrayComponent implements OnChanges, OnDestroy {
  showDetails = signal<Dictionary<boolean>>({});

  readonly muscles = input.required<Muscle[]>();
  readonly modalId = input.required<string>();

  readonly actionMuscle = output<FormIndicator>();

  private readonly unsubscribe$ = new Subject<void>();

  ngOnChanges(): void {
    this.muscles().forEach((muscle: Muscle) => this.showDetails.update(value => ({...value, [muscle.id]: false})));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  expendMuscleDetails(id: number): void {
    let idKey: string = id.toString()
    this.showDetails.update(value => ({...value, [idKey]: !value[idKey]}));
  }

  showMuscleDetails(muscle: Muscle): void {
    this.actionMuscle.emit({
      actionType: ActionType.read,
      object: muscle
    });
  }

  modifyMuscle(muscle: Muscle) {
    this.actionMuscle.emit({
      actionType: ActionType.update,
      object: muscle
    });
  }

  delMuscle(muscle: Muscle) {
    this.actionMuscle.emit({
      actionType: ActionType.delete,
      object: muscle
    });
  }

  getVisibleExercises(muscle: Muscle) {
    return this.showDetails()[muscle.id]
      ? muscle.exercises
      : muscle.exercises.slice(0, 2);
  }
}
