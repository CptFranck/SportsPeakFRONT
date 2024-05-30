import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_MUSCLES} from "../../../graphql/muscle/muscle.operations";
import {CommonModule} from '@angular/common';
import {ModalComponent} from "../../../components/modal/modal.component";
import {MusclesArrayComponent} from "../muscles-array/muscles-array.component";
import {Muscle} from "../../../interface/dto/muscle";
import {GraphqlResponse} from "../../../interface/graphql/graphqlResponse";
import {MuscleFormComponent} from "../muscle-form/muscle-form.component";
import {ModalButtonComponent} from "../../../components/button/modalButton/modal-button.component";
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {AlertComponent} from "../../../components/alert/alert.component";
import {alertType} from "../../../enum/alert-type";
import {GraphQLError} from "graphql/error";
import {Alert} from "../../../interface/utils/alert";

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [CommonModule, ModalComponent, MusclesArrayComponent, MuscleFormComponent, ModalButtonComponent, MultiSelectComponent, SelectExercisesComponent, LoadingComponent, AlertComponent],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit {
  muscles: Muscle[] = [];
  loading = true;
  modalId: string = "muscleModal"
  alertId: number = 0;
  alerts: Alert[] = [];

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
      title: "Successfully set",
      message: "Error has occurred: " + graphQLError.message,
      type: alertType.success
    })
    this.alertId += 1;
  }

  setAlertSuccess(muscle: Muscle) {
    this.alerts.push({
      id: this.alertId,
      title: "Successfully set",
      message: "New muscle " + muscle.name + "added successfully.",
      type: alertType.success
    })
    this.alertId += 1;
  }

  removeAlert($event: Alert) {
    this.alerts.filter(alert => alert.id === $event.id);
  }
}
