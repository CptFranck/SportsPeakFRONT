import {Component, inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../enum/action-type";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {MuscleEntityFormComponent} from "../muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {muscleDeleteFormComponent} from "../muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {Muscle} from "../../../interface/dto/muscle";
import {GraphQLError} from "graphql/error";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-muscle-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent
  ],
  templateUrl: './muscle-modal.component.html',
})
export class MuscleModalComponent {

  @Input() modalTitle!: string;
  @Input() muscleModalId!: string;
  @Input() muscle: Muscle | undefined;
  @Input() action!: ActionType;
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  alertService: AlertService = inject(AlertService);
  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.muscle = value
    this.action = ActionType.create
    this.modalTitle = "Add new muscle";
  }

  setAlertError(graphQLError: GraphQLError) {
    this.alertService.createGraphQLErrorAlert(graphQLError);
  }

  setAlertSuccessAdded(muscle: Muscle) {
    let message = "Muscle " + muscle.name + " been successfully created."
    this.alertService.addSuccessAlert(message);
  }

  setAlertSuccessUpdated(muscle: Muscle) {
    let message = "Muscle " + muscle.name + " has been successfully updated."
    this.alertService.addSuccessAlert(message);
  }

  setAlertSuccessDeleted(muscle: Muscle) {
    let message = "Muscle " + muscle.name + " has been successfully deleted."
    this.alertService.addSuccessAlert(message);
  }
}
