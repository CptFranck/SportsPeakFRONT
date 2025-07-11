import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {ProgExercise} from "../../../shared/model/dto/prog-exercise";
import {
  ADD_PROG_EXERCISE,
  DEL_PROG_EXERCISE,
  GET_PROG_EXERCISE_BY_ID,
  GET_PROG_EXERCISES,
  GET_USER_PROG_EXERCISES,
  MOD_PROG_EXERCISE,
  MOD_PROG_EXERCISE_TRUST_LABEL
} from "../../graphql/operations/prog-exercise.operations";
import {User} from "../../../shared/model/dto/user";
import {CurrentUserService} from "../current-user/current-user.service";
import {Router} from "@angular/router";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class ProgExerciseService {

  private readonly isLoadingSubject = new BehaviorSubject<boolean>(true);
  private readonly progExerciseListSubject = new BehaviorSubject<ProgExercise[]>([]);
  private readonly progExerciseSelectedSubject = new BehaviorSubject<ProgExercise | undefined>(undefined);
  private readonly userProgExerciseListSubject = new BehaviorSubject<ProgExercise[]>([]);

  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.getProgExercises();
    this.currentUserService.currentUser$.subscribe((user: User | undefined) => user && this.getUserProgExercises(user));
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get progExerciseList$() {
    return this.progExerciseListSubject.asObservable();
  }

  get progExerciseSelected$() {
    return this.progExerciseSelectedSubject.asObservable();
  }

  get userProgExerciseList$() {
    return this.userProgExerciseListSubject.asObservable();
  }

  getProgExercises() {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_PROG_EXERCISES,
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.progExerciseListSubject.next(data.getProgExercises);
        this.isLoadingSubject.next(loading);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  getProgExerciseById(progExerciseId: number) {
    this.progExerciseSelectedSubject.next(undefined);
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_PROG_EXERCISE_BY_ID,
      variables: {
        id: progExerciseId
      }
    }).valueChanges.subscribe(({data, loading}: ApolloQueryResult<any>) => {
      this.isLoadingSubject.next(loading);
      this.progExerciseSelectedSubject.next(data.getProgExerciseById);
    });
  }

  getUserProgExercises(user: User) {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_USER_PROG_EXERCISES,
      variables: {
        userId: user.id
      }
    }).valueChanges.subscribe(({data, loading}: ApolloQueryResult<any>) => {
      this.isLoadingSubject.next(loading);
      this.userProgExerciseListSubject.next(data.getUserProgExercises);
    });
  }

  addProgExercise(progExercisesForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_PROG_EXERCISE,
      variables: {
        inputNewProgExercise: progExercisesForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`Programed exercise ${data.addProgExercise.name} has been successfully created.`));
  }

  modifyProgExercise(progExercisesForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_PROG_EXERCISE,
      variables: {
        inputProgExercise: progExercisesForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`Programed exercise ${data.modifyProgExercise.name} has been successfully updated.`));
  }

  modifyProgExerciseTrustLabel(progExercisesForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_PROG_EXERCISE_TRUST_LABEL,
      variables: {
        inputProgExerciseTrustLabel: progExercisesForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`Programed exercise ${data.modifyProgExerciseTrustLabel.name} has been successfully updated.`));
  }

  deleteProgExercises(progExercise: ProgExercise) {
    this.apolloWrapperService.mutate({
      mutation: DEL_PROG_EXERCISE,
      variables: {
        progExerciseId: progExercise.id,
      }
    }).subscribe(() => {
      this.router.navigateByUrl('/my-fitness-plan/my-programed-exercises')
      this.alertService.addSuccessAlert(`Programed exercise ${progExercise.name} has been successfully deleted.`);
    });
  }
}
