import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {
  ADD_EXERCISE_TYPES,
  DEL_EXERCISE_TYPES,
  GET_EXERCISE_TYPES,
  MOD_EXERCISE_TYPES
} from "../../graphql/operations/exercise-type.operation";
import {BehaviorSubject} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {ExerciseType} from "../../interface/dto/exercise-type";
import {ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class ExerciseTypeService {

  exerciseTypes: BehaviorSubject<ExerciseType[]> = new BehaviorSubject<ExerciseType[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);

  constructor() {
    this.getExerciseTypes();
  }

  getExerciseTypes() {
    return this.apollo.watchQuery({
      query: GET_EXERCISE_TYPES,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        this.exerciseTypes.next(result.data.getExerciseTypes);
        this.isLoading.next(result.loading);
      }
    });
  }

  addExerciseType(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_EXERCISE_TYPES,
      variables: {
        inputNewExerciseType: muscleForm.value,
      },
      refetchQueries: [{
        query: GET_EXERCISE_TYPES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "ExerciseType " + result.data.addExerciseType.name + " been successfully created.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyExerciseType(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_EXERCISE_TYPES,
      variables: {
        inputExerciseType: muscleForm.value,
      },
      refetchQueries: [{
        query: GET_EXERCISE_TYPES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "ExerciseType " + result.data.modifyExerciseType.name + " has been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteExerciseType(exerciseType: ExerciseType) {
    return this.apollo.mutate({
      mutation: DEL_EXERCISE_TYPES,
      variables: {
        exerciseTypeId: exerciseType.id,
      },
      refetchQueries: [{
        query: GET_EXERCISE_TYPES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "ExerciseType " + exerciseType.name + " has been successfully deleted.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
