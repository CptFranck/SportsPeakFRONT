import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_MUSCLES} from "../../../graphql/muscle/muscle.operations";
import {CommonModule} from '@angular/common';
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {MusclesArrayComponent} from "../muscles-array/muscles-array.component";
import {Muscle} from "../../../interface/dto/muscle";
import {GraphqlResponse} from "../../../interface/graphql/graphqlResponse";
import {MuscleEntityFormComponent} from "../msucle-modal-compoents/muscle-entity-form/muscle-entity-form.component";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {AlertComponent} from "../../../components/alert/alert.component";
import {AlertType} from "../../../enum/alert-type";
import {GraphQLError} from "graphql/error";
import {Alert} from "../../../interface/utils/alert";
import {ModalAndButtonComponent} from "../../../components/modal/modal-and-button/modal-and-button.component";
import {
  MuscleDetailsDisplayComponent
} from "../msucle-modal-compoents/muscle-details-display/muscle-details-display.component";
import {muscleDeleteFormComponent} from "../msucle-modal-compoents/muscle-delete-form/muscle-delete-form.component";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [CommonModule, ModalComponent, MusclesArrayComponent, MuscleEntityFormComponent, ModalButtonComponent, MultiSelectComponent, SelectExercisesComponent, LoadingComponent, AlertComponent, ModalAndButtonComponent, MuscleDetailsDisplayComponent, muscleDeleteFormComponent],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit {
  muscles: Muscle[] = [];
  muscle: Muscle | undefined;
  newMuscle: Muscle = {id: "", name: "", description: "", function: "", exercises: []};
  loading = true;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  validateClassButton: string = "btn-success";
  validateTitleButton: string = "";
  muscleModalId: string = "muscleModal"
  alertId: number = 0;
  alerts: Alert[] = [];
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>
  isForm: boolean = true;
  protected readonly ActionType = ActionType;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_MUSCLES,
      })
      .valueChanges.subscribe((result: GraphqlResponse): void => {
      this.muscles = result.data.getMuscles;
      this.loading = result.loading;
      if (result.error)
        this.setAlertError(result.error)
    });
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

  removeAlert(event: Alert) {
    this.alerts.filter(alert => alert.id === event.id);
  }

  setNewMuscle(muscle: Muscle) {
    this.isForm = true
    this.muscle = muscle
    this.validateClassButton = "btn-success";
    this.action = ActionType.create
    this.modalTitle = "Add new muscle";
    this.validateTitleButton = "Create"
  }

  setMuscle(formIndicator: FormIndicator) {
    this.muscle = formIndicator.object
    this.action = formIndicator.actionType
    this.modalTitle = formIndicator.object.name
    this.validateTitleButton = formIndicator.actionType
    this.isForm = formIndicator.actionType !== ActionType.read;

    if (formIndicator.actionType === ActionType.delete) {
      this.validateClassButton = "btn-danger"
    } else {
      this.validateClassButton = "btn-success";
    }
  }
}
