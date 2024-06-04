import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {
  ADD_EXERCISE_TYPES,
  DEL_EXERCISE_TYPES,
  GET_EXERCISE_TYPES,
  MOD_EXERCISE_TYPES
} from "../../graphql/exerciseType/exercise-type.operation";

@Injectable({
  providedIn: 'root'
})
export class ExerciseTypeService {
  private apollo: Apollo = inject(Apollo);

  getExerciseType() {
    return this.apollo.watchQuery({
      query: GET_EXERCISE_TYPES,
    }).valueChanges;
  }

  addExerciseType(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_EXERCISE_TYPES,
      variables: {
        inputNewExerciseType: muscleForm.value,
      },
    });
  }

  modifyExerciseType(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_EXERCISE_TYPES,
      variables: {
        inputExerciseType: muscleForm.value,
      },
    });
  }

  deleteExerciseType(id: string) {
    return this.apollo.mutate({
      mutation: DEL_EXERCISE_TYPES,
      variables: {
        exerciseTypeId: id,
      },
    });
  }
}
