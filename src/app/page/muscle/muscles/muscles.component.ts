import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {MusclesArrayComponent} from "../muscles-array/muscles-array.component";
import {Muscle} from "../../../interface/dto/muscle";
import {MuscleEntityFormComponent} from "../msucle-modal-compoents/muscle-entity-form/muscle-entity-form.component";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {MultiSelectComponent} from "../../../components/select/multi-select/multi-select.component";
import {SelectExercisesComponent} from "../../../components/select/select-exercises/select-exercises.component";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {AlertComponent} from "../../../components/alert/alert.component";
import {
  MuscleDetailsDisplayComponent
} from "../msucle-modal-compoents/muscle-details-display/muscle-details-display.component";
import {muscleDeleteFormComponent} from "../msucle-modal-compoents/muscle-delete-form/muscle-delete-form.component";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";
import {MuscleModalComponent} from "../muscle-modal/muscle-modal.component";
import {AlertDisplayComponent} from "../../../components/crud-alert/alert-display.component";
import {GraphQLError} from "graphql/error";
import {AlertService} from "../../../services/alert/alert.service";
import {MuscleService} from "../../../services/muscle/muscle.service";
import {ApolloQueryResult} from "@apollo/client";

@Component({
  selector: 'app-muscles',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    MusclesArrayComponent,
    MuscleEntityFormComponent,
    ModalButtonComponent,
    MultiSelectComponent,
    SelectExercisesComponent,
    LoadingComponent,
    AlertComponent,
    MuscleDetailsDisplayComponent,
    muscleDeleteFormComponent,
    MuscleModalComponent,
    AlertDisplayComponent
  ],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit {
  loading = true;
  muscles: Muscle[] = [];
  muscle: Muscle | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "muscleModal"

  alertService: AlertService = inject(AlertService);
  muscleService: MuscleService = inject(MuscleService);
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  ngOnInit(): void {
    this.muscleService.getMuscles().subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        result.errors.map(err => this.setAlertError(err))
      }
      this.muscles = result.data.getMuscles;
      this.loading = result.loading;
    });
  }

  setAlertError(graphQLError: GraphQLError) {
    let message: string = "Error has occurred: " + graphQLError.message;
    this.alertService.createErrorAlert(message);
  }

  setMuscle(formIndicator: FormIndicator) {
    this.muscle = formIndicator.object
    this.action = formIndicator.actionType
    this.modalTitle = formIndicator.object.name
  }
}
