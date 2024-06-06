import {Component, inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {AlertService} from "../../../services/alert/alert.service";
import {GraphQLError} from "graphql/error";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../../muscle/muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {
  MuscleEntityFormComponent
} from "../../muscle/muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {
  muscleDeleteFormComponent
} from "../../muscle/muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {ActionType} from "../../../enum/action-type";
import {Exercise} from "../../../interface/dto/exercise";
import {
  ExerciseEntityFormComponent
} from "../exercise-modal-components/exercise-entity-form/exercise-entity-form.component";
import {
  ExerciseDeleteFormComponent
} from "../exercise-modal-components/exercise-delete-form/exercise-delete-form.component";
import {
  ExerciseDetailsDisplayComponent
} from "../exercise-modal-components/exercise-details-display/exercise-details-display.component";

@Component({
  selector: 'app-exercise-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    ExerciseEntityFormComponent,
    ExerciseDeleteFormComponent,
    ExerciseDetailsDisplayComponent
  ],
  templateUrl: './exercise-modal.component.html',
})
export class ExerciseModalComponent {
  @Input() modalTitle!: string;
  @Input() exerciseModalId!: string;
  @Input() exercise: Exercise | undefined;
  @Input() action!: ActionType;
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  alertService: AlertService = inject(AlertService);
  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.exercise = value
    this.action = ActionType.create
    this.modalTitle = "Add new Exercise";
  }

  setAlertError(graphQLError: GraphQLError) {
    this.alertService.createGraphQLErrorAlert(graphQLError);
  }

  setAlertSuccessAdded(exercise: Exercise) {
    let message = "Exercise " + exercise.name + " been successfully created."
    this.alertService.addSuccessAlert(message);
  }

  setAlertSuccessUpdated(exercise: Exercise) {
    let message = "Exercise " + exercise.name + " been successfully updated."
    this.alertService.addSuccessAlert(message);
  }

  setAlertSuccessDeleted(exercise: Exercise) {
    let message = "Exercise " + exercise.name + " been successfully deleted."
    this.alertService.addSuccessAlert(message);
  }
}
