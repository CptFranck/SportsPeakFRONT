import {inject, Injectable} from '@angular/core';
import {MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {
  ADD_EXERCISE,
  DEL_EXERCISE,
  GET_EXERCISE_BY_ID,
  GET_EXERCISES,
  MOD_EXERCISE
} from "../../graphql/operations/exercise.operations";
import {BehaviorSubject} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Exercise} from "../../../shared/model/dto/exercise";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";
import {ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  private exerciseListSubject = new BehaviorSubject<Exercise[]>([]);
  private selectedExerciseSubject = new BehaviorSubject<Exercise | undefined>(undefined);

  private readonly alertService = inject(AlertService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.getExercises();
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get exerciseList$() {
    return this.exerciseListSubject.asObservable();
  }

  get selectedExercise$() {
    return this.selectedExerciseSubject.asObservable();
  }

  getExercises() {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_EXERCISES,
    }).valueChanges.subscribe({
        next: ({data, errors, loading}: ApolloQueryResult<any>) => {
          if (errors)
            this.alertService.graphQLErrorAlertHandler(errors);
          this.exerciseListSubject.next(data?.getExercises ?? []);
          this.isLoadingSubject.next(loading);
        },
        error: () => this.isLoadingSubject.next(false),
      }
    );
  }

  getExerciseById(id: number) {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_EXERCISE_BY_ID,
      variables: {id: id}
    }).valueChanges.subscribe({
      next: ({data, errors, loading}: ApolloQueryResult<any>) => {
        if (errors)
          this.alertService.graphQLErrorAlertHandler(errors);
        this.selectedExerciseSubject.next(data.getExerciseById);
        this.isLoadingSubject.next(loading);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  addExercise(exerciseForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_EXERCISE,
      variables: {
        inputNewExercise: exerciseForm.value,
      },
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Exercise ${data.addExercise.name} has been successfully created.`);
    });
  }

  modifyExercise(exerciseForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_EXERCISE,
      variables: {
        inputExercise: exerciseForm.value,
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Exercise ${data.modifyExercise.name} has been successfully updated.`);
    });
  }

  deleteExercise(exercise: Exercise) {
    this.apolloWrapperService.mutate({
      mutation: DEL_EXERCISE,
      variables: {
        exerciseId: exercise.id,
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Exercise ${exercise.name} has been successfully deleted.`);
    });
  }
}
