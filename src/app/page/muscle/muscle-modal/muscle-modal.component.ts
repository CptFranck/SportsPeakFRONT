import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../enum/action-type";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../msucle-modal-compoents/muscle-details-display/muscle-details-display.component";
import {MuscleEntityFormComponent} from "../msucle-modal-compoents/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {muscleDeleteFormComponent} from "../msucle-modal-compoents/muscle-delete-form/muscle-delete-form.component";
import {Muscle} from "../../../interface/dto/muscle";
import {GraphQLError} from "graphql/error";
import {AlertType} from "../../../enum/alert-type";
import {Alert} from "../../../interface/utils/alert";

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

  @Input() alertId: number = 0;
  @Input() alerts: Alert[] = [];

  newMuscle: Muscle = {id: "", name: "", description: "", function: "", exercises: []};
  @Input() muscle: Muscle | undefined;
  @Input() action!: ActionType;
  @Input() modalTitle!: string;
  @Input() muscleModalId!: string;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>
  isForm: boolean = true;
  protected readonly ActionType = ActionType;

  setNewMuscle(muscle: Muscle) {
    this.isForm = true
    this.muscle = muscle
    this.action = ActionType.create
    this.modalTitle = "Add new muscle";
  }

  setAlertError(graphQLError: GraphQLError) {
    this.alerts.push({
      id: this.alertId,
      title: "Unsuccessfully set",
      message: "Error has occurred: " + graphQLError.message,
      type: AlertType.success
    })
    this.alertId += 1;
  }

  setAlertSuccessAdded(muscle: Muscle) {
    this.alerts.push({
      id: this.alertId,
      title: "Muscle successfully created",
      message: "New muscle " + muscle.name + "been successfully added.",
      type: AlertType.success
    })
    this.alertId += 1;
  }

  setAlertSuccessUpdated(muscle: Muscle) {
    this.alerts.push({
      id: this.alertId,
      title: "Muscle successfully updated",
      message: "Muscle " + muscle.name + "been successfully updated.",
      type: AlertType.success
    })
    this.alertId += 1;
  }

  setAlertSuccessDeleted(muscle: Muscle) {
    this.alerts.push({
      id: this.alertId,
      title: "Muscle successfully deleted",
      message: "Muscle " + muscle.name + "been successfully deleted.",
      type: AlertType.success
    })
    this.alertId += 1;
  }
}
