import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {CommonModule} from '@angular/common';
import {ExercisesArrayComponent} from "../exercises-array/exercises-array.component";
import {ActionType} from "../../../enum/action-type";
import {AlertService} from "../../../services/alert/alert.service";
import {Exercise} from "../../../interface/dto/exercise";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../muscle/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../muscle/muscles-array/muscles-array.component";
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ExercisesArrayComponent, LoadingComponent, MuscleModalComponent, MusclesArrayComponent, ExerciseModalComponent],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent implements OnInit {
  loading = true;
  exercises: Exercise[] = [];
  exercise: Exercise | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  exerciseModalId: string = "exerciseModal"

  alertService: AlertService = inject(AlertService);
  exerciseService: ExerciseService = inject(ExerciseService);
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        result.errors.map(err => this.alertService.createGraphQLErrorAlert(err))
      }
      this.exercises = result.data.getExercises;
      this.loading = result.loading;
    });
  }

  setExercise(formIndicator: FormIndicator) {
    this.exercise = formIndicator.object
    this.action = formIndicator.actionType
    this.modalTitle = formIndicator.object.name
  }
}
