import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";
import {ExerciseType} from "../../../interface/dto/exerciseType";
import {NgForOf, NgIf} from "@angular/common";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";

@Component({
  selector: 'app-exercise-type-array',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ModalButtonComponent
  ],
  templateUrl: './exercise-type-array.component.html',
})
export class ExerciseTypeArrayComponent implements OnInit {
  @Input() exerciseTypes!: ExerciseType[];
  @Input() modalId!: string;

  @Output() actionExerciseType: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  showDetails: { [id: string]: boolean } = {};

  ngOnInit(): void {
    this.exerciseTypes.map((exerciseType: ExerciseType) => this.showDetails[exerciseType.id] = false);
  }

  expendExerciseTypeDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id];
  }

  showExerciseTypeDetails(exerciseType: ExerciseType): void {
    this.actionExerciseType.emit({
      actionType: ActionType.read,
      object: exerciseType
    });
  }

  modifyExerciseType(exerciseType: ExerciseType) {
    this.actionExerciseType.emit({
      actionType: ActionType.update,
      object: exerciseType
    });
  }

  delExerciseType(exerciseType: ExerciseType) {
    this.actionExerciseType.emit({
      actionType: ActionType.delete,
      object: exerciseType
    });
  }
}
