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
import {ApolloCache, ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class ExerciseTypeService {

  exerciseTypes: BehaviorSubject<ExerciseType[]> = new BehaviorSubject<ExerciseType[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly apollo: Apollo = inject(Apollo);
  private readonly alertService: AlertService = inject(AlertService);

  constructor() {
    this.getExerciseTypes();
  }

  getExerciseTypes() {
    this.isLoading.next(true);
    this.apollo.watchQuery({
      query: GET_EXERCISE_TYPES,
    })
      .valueChanges
      .subscribe((result: ApolloQueryResult<any>): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          this.exerciseTypes.next(result.data.getExerciseTypes);
          this.isLoading.next(result.loading);
        }
      });
  }

  // addExerciseType(exerciseTypeForm: FormGroup) {
  //   this.apollo.mutate({
  //     mutation: ADD_EXERCISE_TYPES,
  //     variables: {
  //       inputNewExerciseType: exerciseTypeForm.value,
  //     },
  //     refetchQueries: [{
  //       query: GET_EXERCISE_TYPES,
  //     }]
  //   }).subscribe((result: MutationResult) => {
  //     if (result.errors) {
  //       this.alertService.graphQLErrorAlertHandler(result.errors);
  //     } else {
  //       let message: string = "ExerciseType " + result.data.addExerciseType.name + " been successfully created.";
  //       this.alertService.addSuccessAlert(message);
  //     }
  //   });
  // }

  addExerciseType(exerciseTypeForm: FormGroup) {
    this.apollo.mutate({
      mutation: ADD_EXERCISE_TYPES,
      variables: {
        inputNewExerciseType: exerciseTypeForm.value,
      },
      update: (cache: ApolloCache<{ getExerciseTypes: ExerciseType[] }>, {data}: MutationResult) => {
        if (!data) return;
        const newExerciseType: ExerciseType = data.addExerciseType;
        const existingData: any = cache.readQuery({query: GET_EXERCISE_TYPES});
        cache.writeQuery({
          query: GET_EXERCISE_TYPES,
          data: {
            getExerciseTypes: [...existingData.getExerciseTypes, newExerciseType]
          }
        });
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      else if (data)
        this.alertService.addSuccessAlert(`ExerciseType ${data.addExerciseType.name} created successfully.`);
      else
        this.alertService.addErrorAlert("data is null or undefined");
    });
  }

  // modifyExerciseType(muscleForm: FormGroup) {
  //   this.apollo.mutate({
  //     mutation: MOD_EXERCISE_TYPES,
  //     variables: {
  //       inputExerciseType: muscleForm.value,
  //     },
  //     refetchQueries: [{
  //       query: GET_EXERCISE_TYPES,
  //     }]
  //   }).subscribe((result: MutationResult) => {
  //     if (result.errors) {
  //       this.alertService.graphQLErrorAlertHandler(result.errors);
  //     } else {
  //       let message: string = "ExerciseType " + result.data.modifyExerciseType.name + " has been successfully updated.";
  //       this.alertService.addSuccessAlert(message);
  //     }
  //   });
  // }

  modifyExerciseType(exerciseTypeForm: FormGroup) {
    this.apollo.mutate({
      mutation: MOD_EXERCISE_TYPES,
      variables: {
        inputExerciseType: exerciseTypeForm.value,
      },
      update: (cache: ApolloCache<{ getExerciseTypes: ExerciseType[] }>, {data}: MutationResult) => {
        if (!data) return;
        const updatedExerciseType: ExerciseType = data.modifyExerciseType;
        const existingData: any = cache.readQuery({query: GET_EXERCISE_TYPES});
        const updatedList: ExerciseType[] = existingData.getExerciseTypes.map((et: ExerciseType) =>
          et.id === updatedExerciseType.id ? updatedExerciseType : et
        );
        cache.writeQuery({
          query: GET_EXERCISE_TYPES,
          data: {getExerciseTypes: updatedList}
        });
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      else if (data)
        this.alertService.addSuccessAlert(`ExerciseType ${data.modifyExerciseType.name} updated successfully.`);
      else
        this.alertService.addErrorAlert("data is null or undefined");
    });
  }

  // deleteExerciseType(exerciseType: ExerciseType) {
  //   this.apollo.mutate({
  //     mutation: DEL_EXERCISE_TYPES,
  //     variables: {
  //       exerciseTypeId: exerciseType.id,
  //     },
  //     refetchQueries: [{
  //       query: GET_EXERCISE_TYPES,
  //     }]
  //   }).subscribe((result: MutationResult) => {
  //     if (result.errors) {
  //       this.alertService.graphQLErrorAlertHandler(result.errors);
  //     } else {
  //       let message: string = "ExerciseType " + exerciseType.name + " has been successfully deleted.";
  //       this.alertService.addSuccessAlert(message);
  //     }
  //   });
  // }

  deleteExerciseType(exerciseType: ExerciseType) {
    this.apollo.mutate({
      mutation: DEL_EXERCISE_TYPES,
      variables: {exerciseTypeId: exerciseType.id},
      update: (cache: ApolloCache<{ getExerciseTypes: ExerciseType[] }>) => {
        const existingData: any = cache.readQuery({query: GET_EXERCISE_TYPES});
        const filteredData = existingData.getExerciseTypes.filter((et: ExerciseType) => et.id !== exerciseType.id);
        cache.writeQuery({
          query: GET_EXERCISE_TYPES,
          data: {getExerciseTypes: filteredData}
        });
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      else
        this.alertService.addSuccessAlert(`ExerciseType ${exerciseType.name} deleted successfully.`);
    });
  }
}
