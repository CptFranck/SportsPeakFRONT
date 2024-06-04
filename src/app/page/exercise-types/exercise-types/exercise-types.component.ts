import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExerciseType} from "../../../interface/dto/exerciseType";
import {ActionType} from "../../../enum/action-type";
import {AlertService} from "../../../services/alert/alert.service";
import {ExerciseTypeService} from "../../../services/exercise-type/exercise-type.service";
import {ApolloQueryResult} from "@apollo/client";
import {GraphQLError} from "graphql/error";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {AlertDisplayComponent} from "../../../components/crud-alert/alert-display.component";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {ExerciseTypeArrayComponent} from "../exercise-types-array/exercise-type-array.component";

@Component({
  selector: 'app-exercise-types',
  standalone: true,
  imports: [CommonModule, AlertDisplayComponent, LoadingComponent, ExerciseTypeArrayComponent],
  templateUrl: './exercise-types.component.html',
})
export class ExerciseTypesComponent implements OnInit {
  loading = true;
  exerciseTypes: ExerciseType[] = [];
  exerciseType: ExerciseType | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  exerciseTypeModalId: string = "exercisesTypeModal"

  alertService: AlertService = inject(AlertService);
  exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  ngOnInit(): void {
    this.exerciseTypeService.getExerciseType().subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        result.errors.map(err => this.setAlertError(err))
      }
      this.exerciseTypes = result.data.getExerciseTypes;
      this.loading = result.loading;
    });
  }

  setAlertError(graphQLError: GraphQLError) {
    let message: string = "Error has occurred: " + graphQLError.message;
    this.alertService.createErrorAlert(message);
  }

  setExerciseType(formIndicator: FormIndicator) {
    this.exerciseType = formIndicator.object
    this.action = formIndicator.actionType
    this.modalTitle = formIndicator.object.name
  }
}
