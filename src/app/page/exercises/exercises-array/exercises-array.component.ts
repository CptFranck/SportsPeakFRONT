import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";
import {Exercise} from "../../../interface/dto/exercise";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";

@Component({
  selector: 'app-exercises-array',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ModalButtonComponent
  ],
  templateUrl: './exercises-array.component.html',
})
export class ExercisesArrayComponent implements OnInit {
  @Input() exercises!: Exercise[];
  @Input() modalId!: string;
  @Output() actionExercise = new EventEmitter<FormIndicator>();
  showDetails: { [id: string]: boolean } = {};

  ngOnInit(): void {
    this.exercises.map(exercise => this.showDetails[exercise.id] = false)
  }

  expendExerciseDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id]
  }

  showExerciseDetails(exercise: Exercise): void {
    this.actionExercise.emit({
      actionType: ActionType.read,
      object: exercise
    })
  }

  modifyExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionType.update,
      object: exercise
    })
  }

  delExercise(exercise: Exercise) {
    this.actionExercise.emit({
      actionType: ActionType.delete,
      object: exercise
    })
  }
}