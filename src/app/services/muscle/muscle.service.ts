import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {ADD_MUSCLE, DEL_MUSCLE, GET_MUSCLES, MOD_MUSCLE} from "../../graphql/operations/muscle/muscle.operations";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Muscle} from "../../interface/dto/muscle";
import {AlertService} from "../alert/alert.service";
import {GraphQLError} from "graphql/error";
import {ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class MuscleService {

  muscles: BehaviorSubject<Muscle[]> = new BehaviorSubject<Muscle[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);

  constructor() {
    this.getMuscles();
  }

  getMuscles() {
    return this.apollo.watchQuery({
      query: GET_MUSCLES,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        result.errors.map((err: GraphQLError) =>
          this.alertService.createGraphQLErrorAlert(err))
      }
      this.muscles.next(result.data.getMuscles);
      this.isLoading.next(result.loading);
    });
  }

  addMuscle(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_MUSCLE,
      variables: {
        inputNewMuscle: muscleForm.value,
      },
    }).subscribe(
      (result: MutationResult): void => {
        if (result.errors) {
          result.errors.map((err: GraphQLError) =>
            this.alertService.createGraphQLErrorAlert(err))
        } else {
          let message: string = "Muscle " + result.data.addMuscle.name + " been successfully created."
          this.alertService.addSuccessAlert(message);
        }
      });
  }

  modifyMuscle(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_MUSCLE,
      variables: {
        inputMuscle: muscleForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        result.errors.map((err: GraphQLError) =>
          this.alertService.createGraphQLErrorAlert(err))
      } else {
        let message: string = "Muscle " + result.data.modifyMuscle.name + " been successfully updated."
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteMuscle(muscle: Muscle) {
    return this.apollo.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        muscleId: muscle.id,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        result.errors.map((err: GraphQLError) =>
          this.alertService.createGraphQLErrorAlert(err))
      } else {
        let message: string = "Muscle " + muscle.name + " has been successfully deleted."
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
