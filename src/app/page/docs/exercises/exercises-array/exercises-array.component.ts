import {Component, EventEmitter, inject, Input, OnChanges, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../enum/action-type";
import {Exercise} from "../../../../interface/dto/exercise";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {Dictionary} from "../../../../interface/utils/dictionary";

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
export class ExercisesArrayComponent implements OnChanges {
  isAdmin: boolean = false;
  showDetails: Dictionary<boolean> = {};

  @Input() exercises!: Exercise[];
  @Input() modalId!: string;

  @Output() actionExercise: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnChanges(): void {
    this.exercises.forEach((exercise: Exercise) => this.showDetails[exercise.id] = false);
    this.userLoggedService.currentUser.subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
  }

  expendExerciseDetails(id: string): void {
    this.showDetails[id] = !this.showDetails[id];
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
