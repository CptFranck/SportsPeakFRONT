import {inject, Injectable} from '@angular/core';
import {MutationResult} from "apollo-angular";
import {ADD_MUSCLE, DEL_MUSCLE, GET_MUSCLES, MOD_MUSCLE} from "../../graphql/operations/muscle.operations";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Muscle} from "../../interface/dto/muscle";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class MuscleService {

  muscles = new BehaviorSubject<Muscle[]>([]);
  isLoading = new BehaviorSubject<boolean>(true);

  private readonly apolloWrapperService = inject(ApolloWrapperService);
  private readonly alertService = inject(AlertService);

  constructor() {
    this.getMuscles();
  }

  getMuscles() {
    this.isLoading.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_MUSCLES,
    }).valueChanges.subscribe({
      next: ({data, errors, loading}: ApolloQueryResult<any>) => {
        if (errors)
          this.alertService.graphQLErrorAlertHandler(errors);
        this.muscles.next(data.getMuscles);
        this.isLoading.next(loading);
      },
      error: () => this.isLoading.next(false),
    });
  }

  addMuscle(muscleForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_MUSCLE,
      variables: {
        inputNewMuscle: muscleForm.value,
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      const message: string = "Muscle " + data.addMuscle.name + " been successfully created.";
      this.alertService.addSuccessAlert(message);
    });
  }

  modifyMuscle(muscleForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_MUSCLE,
      variables: {
        inputMuscle: muscleForm.value,
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      const message: string = "Muscle " + data.modifyMuscle.name + " been successfully updated.";
      this.alertService.addSuccessAlert(message);
    });
  }

  deleteMuscle(muscle: Muscle) {
    this.apolloWrapperService.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        muscleId: muscle.id,
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Muscle ${muscle.name} has been successfully deleted.`);
    });
  }
}
