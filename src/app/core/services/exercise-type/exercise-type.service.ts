import {inject, Injectable} from '@angular/core';
import {MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {
  ADD_EXERCISE_TYPES,
  DEL_EXERCISE_TYPES,
  GET_EXERCISE_TYPES,
  GET_EXERCISE_TYPES_BY_ID,
  MOD_EXERCISE_TYPES
} from "../../graphql/operations/exercise-type.operation";
import {AlertService} from "../alert/alert.service";
import {ExerciseType} from "../../../shared/model/dto/exercise-type";
import {ApolloQueryResult} from "@apollo/client";
import {BehaviorSubject} from "rxjs";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class ExerciseTypeService {

  private readonly isLoadingSubject = new BehaviorSubject<boolean>(true);
  private readonly exerciseTypeListSubject = new BehaviorSubject<ExerciseType[]>([]);
  private readonly selectedExerciseTypeSubject = new BehaviorSubject<ExerciseType | undefined>(undefined);

  private readonly alertService = inject(AlertService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.getExerciseTypes();
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get exerciseTypeList$() {
    return this.exerciseTypeListSubject.asObservable();
  }

  get selectedExerciseType$() {
    return this.selectedExerciseTypeSubject.asObservable();
  }

  getExerciseTypes() {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_EXERCISE_TYPES,
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.isLoadingSubject.next(loading);
        this.exerciseTypeListSubject.next(data.getExerciseTypes);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  getExerciseTypeById(id: number) {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_EXERCISE_TYPES_BY_ID,
      variables: {id: id}
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.isLoadingSubject.next(loading);
        this.selectedExerciseTypeSubject.next(data.getExerciseTypeById);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  addExerciseType(exerciseTypeForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_EXERCISE_TYPES,
      variables: {
        inputNewExerciseType: exerciseTypeForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`ExerciseType ${data.addExerciseType.name} has been successfully created.`));
  }

  modifyExerciseType(exerciseTypeForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_EXERCISE_TYPES,
      variables: {
        inputExerciseType: exerciseTypeForm.value,
      },
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`ExerciseType ${data.modifyExerciseType.name} has been successfully updated.`));
  }

  deleteExerciseType(exerciseType: ExerciseType) {
    this.apolloWrapperService.mutate({
      mutation: DEL_EXERCISE_TYPES,
      variables: {exerciseTypeId: exerciseType.id},
    }).subscribe(() => {
      this.alertService.addSuccessAlert(`ExerciseType ${exerciseType.name} has been successfully deleted.`);
    });
  }
}
