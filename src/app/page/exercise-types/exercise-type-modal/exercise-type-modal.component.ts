import {Component, inject, Input, TemplateRef, ViewChild} from '@angular/core';
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
import {AlertService} from "../../../services/alert/alert.service";
import {GraphQLError} from "graphql/error";
import {ActionType} from "../../../enum/action-type";
import {ExerciseType} from "../../../interface/dto/exerciseType";
import {
  ExerciseTypeDetailsDisplayComponent
} from "../exercise-type-modal-components/exercise-type-details-display/exercise-type-details-display.component";
import {
  ExerciseTypeEntityFormComponent
} from "../exercise-type-modal-components/exercise-type-entity-form/exercise-type-entity-form.component";
import {
  ExerciseTypeDeleteFormComponent
} from "../exercise-type-modal-components/exercise-type-delete-form/exercise-type-delete-form.component";

@Component({
  selector: 'app-exercise-type-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    ExerciseTypeDetailsDisplayComponent,
    ExerciseTypeEntityFormComponent,
    ExerciseTypeDeleteFormComponent
  ],
  templateUrl: './exercise-type-modal.component.html',
})
export class ExerciseTypeModalComponent {
  @Input() modalTitle!: string;
  @Input() exerciseTypeModalId!: string;
  @Input() exerciseType: ExerciseType | undefined;
  @Input() action!: ActionType;
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  alertService: AlertService = inject(AlertService);
  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.exerciseType = value
    this.action = ActionType.create
    this.modalTitle = "Add new exerciseType";
  }

  setAlertError(graphQLError: GraphQLError) {
    this.alertService.createGraphQLErrorAlert(graphQLError);
  }

  setAlertSuccessAdded(exerciseType: ExerciseType) {
    let message = "ExerciseType " + exerciseType.name + " been successfully created."
    this.alertService.addSuccessAlert(message);
  }

  setAlertSuccessUpdated(exerciseType: ExerciseType) {
    let message = "ExerciseType " + exerciseType.name + " been successfully updated."
    this.alertService.addSuccessAlert(message);
  }

  setAlertSuccessDeleted(exerciseType: ExerciseType) {
    let message = "ExerciseType " + exerciseType.name + " been successfully deleted."
    this.alertService.addSuccessAlert(message);
  }
}
