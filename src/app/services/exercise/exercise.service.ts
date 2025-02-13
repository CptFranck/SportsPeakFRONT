import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {ADD_EXERCISE, DEL_EXERCISE, GET_EXERCISES, MOD_EXERCISE} from "../../graphql/operations/exercise.operations";
import {BehaviorSubject} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Exercise} from "../../interface/dto/exercise";
import {ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly apollo: Apollo = inject(Apollo);
  private readonly alertService: AlertService = inject(AlertService);

  constructor() {
    this.getExercises();
  }

  getExercises() {
    this.isLoading.next(true);
    return this.apollo.watchQuery({
      query: GET_EXERCISES,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.exercises.next(result.data.getExercises);
      this.isLoading.next(result.loading);
    });
  }

  addExercise(exerciseForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_EXERCISE,
      variables: {
        inputNewExercise: exerciseForm.value,
      },
      refetchQueries: [{
        query: GET_EXERCISES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Exercise " + result.data.addExercise.name + " been successfully created."
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyExercise(exerciseForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_EXERCISE,
      variables: {
        inputExercise: exerciseForm.value,
      },
      refetchQueries: [{
        query: GET_EXERCISES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Exercise " + result.data.modifyExercise.name + " has been successfully updated."
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteExercise(exercise: Exercise) {
    return this.apollo.mutate({
      mutation: DEL_EXERCISE,
      variables: {
        exerciseId: exercise.id,
      },
      refetchQueries: [{
        query: GET_EXERCISES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Exercise " + exercise.name + " has been successfully deleted."
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
