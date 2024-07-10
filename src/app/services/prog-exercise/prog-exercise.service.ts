import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {ProgExercise} from "../../interface/dto/prog-exercise";
import {
  ADD_PROG_EXERCISE,
  DEL_PROG_EXERCISE,
  GET_PROG_EXERCISES,
  MOD_PROG_EXERCISE,
  MOD_PROG_EXERCISE_TRUST_LABEL
} from "../../graphql/operations/prog-exercise.operations";

@Injectable({
  providedIn: 'root'
})
export class ProgExerciseService {

  progExercises: BehaviorSubject<ProgExercise[]> = new BehaviorSubject<ProgExercise[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);

  constructor() {
    this.getProgExercises();
  }

  getProgExercises() {
    return this.apollo.watchQuery({
      query: GET_PROG_EXERCISES,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.progExercises.next(result.data.getProgExercises);
      this.isLoading.next(result.loading);
    });
  }

  addProgExercise(progExercisesForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_PROG_EXERCISE,
      variables: {
        inputNewMuscle: progExercisesForm.value,
      },
    }).subscribe(
      (result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Programed exercise " + result.data.addProgExercise.name + " been successfully created.";
          this.alertService.addSuccessAlert(message);
        }
      });
  }

  modifyProgExercise(progExercisesForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_PROG_EXERCISE,
      variables: {
        inputMuscle: progExercisesForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Programed exercise " + result.data.modifyProgExercise.name + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyProgExerciseTrustLabel(progExercisesForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_PROG_EXERCISE_TRUST_LABEL,
      variables: {
        inputProgExerciseTrustLabel: progExercisesForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Programed exercise " + result.data.modifyProgExerciseTrustLabel.name + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteProgExercises(progExercise: ProgExercise) {
    return this.apollo.mutate({
      mutation: DEL_PROG_EXERCISE,
      variables: {
        muscleId: progExercise.id,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Programed exercise " + progExercise.name + " has been successfully deleted.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
