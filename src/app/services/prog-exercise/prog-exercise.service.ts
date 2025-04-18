import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {ProgExercise} from "../../interface/dto/prog-exercise";
import {
  ADD_PROG_EXERCISE,
  DEL_PROG_EXERCISE,
  GET_PROG_EXERCISE_BY_ID,
  GET_PROG_EXERCISES,
  GET_USER_PROG_EXERCISES,
  MOD_PROG_EXERCISE,
  MOD_PROG_EXERCISE_TRUST_LABEL
} from "../../graphql/operations/prog-exercise.operations";
import {User} from "../../interface/dto/user";
import {UserLoggedService} from "../user-logged/user-logged.service";
import {Router} from "@angular/router";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class ProgExerciseService {

  progExercise = new BehaviorSubject<ProgExercise | undefined>(undefined);
  progExercises = new BehaviorSubject<ProgExercise[]>([]);
  userProgExercises = new BehaviorSubject<ProgExercise[]>([]);
  isLoading = new BehaviorSubject<boolean>(true);

  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  private readonly userLoggedService = inject(UserLoggedService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.getProgExercises();
    this.userLoggedService.currentUser.subscribe((user: User | undefined) => user ? this.getUserProgExercises(user) : null)
  }

  getProgExercises() {
    this.isLoading.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_PROG_EXERCISES,
    }).valueChanges.subscribe(({data, errors, loading}: ApolloQueryResult<any>) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.progExercises.next(data.getProgExercises);
      this.isLoading.next(loading);
    });
  }

  getProgExerciseById(progExerciseId: number) {
    this.progExercise.next(undefined);
    this.isLoading.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_PROG_EXERCISE_BY_ID,
      variables: {
        id: progExerciseId
      }
    }).valueChanges.subscribe(({data, errors, loading}: ApolloQueryResult<any>) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.progExercise.next(data.getProgExerciseById);
      this.isLoading.next(loading);
    });
  }

  getUserProgExercises(user: User) {
    this.isLoading.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_USER_PROG_EXERCISES,
      variables: {
        userId: user.id
      }
    }).valueChanges.subscribe(({data, errors, loading}: ApolloQueryResult<any>) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.userProgExercises.next(data.getUserProgExercises);
      this.isLoading.next(loading);
    });
  }

  addProgExercise(progExercisesForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_PROG_EXERCISE,
      variables: {
        inputNewProgExercise: progExercisesForm.value,
      }
    }).subscribe(({data, errors}: MutationResult): void => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Programed exercise ${data.addProgExercise.name} has been successfully created.`);
    });
  }

  modifyProgExercise(progExercisesForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_PROG_EXERCISE,
      variables: {
        inputProgExercise: progExercisesForm.value,
      }
    }).subscribe(({data, errors}: MutationResult): void => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Programed exercise ${data.modifyProgExercise.name} has been successfully updated.`);
    });
  }

  modifyProgExerciseTrustLabel(progExercisesForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_PROG_EXERCISE_TRUST_LABEL,
      variables: {
        inputProgExerciseTrustLabel: progExercisesForm.value,
      }
    }).subscribe(({data, errors}: MutationResult): void => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Programed exercise ${data.modifyProgExerciseTrustLabel.name} has been successfully updated.`);
    });
  }

  deleteProgExercises(progExercise: ProgExercise) {
    this.apolloWrapperService.mutate({
      mutation: DEL_PROG_EXERCISE,
      variables: {
        progExerciseId: progExercise.id,
      }
    }).subscribe(({errors}: MutationResult): void => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Programed exercise ${progExercise.name} has been successfully deleted.`);
      this.router.navigateByUrl('/my-fitness-plan/my-programed-exercises')
    });
  }
}
