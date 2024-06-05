import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {
  ADD_EXERCISE,
  DEL_EXERCISE,
  GET_EXERCISES,
  MOD_EXERCISE
} from "../../graphql/operations/exercise/exercise.operations";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apollo: Apollo = inject(Apollo);

  getExercises() {
    return this.apollo.watchQuery({
      query: GET_EXERCISES,
    }).valueChanges;
  }

  addExercise(exerciseForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_EXERCISE,
      variables: {
        inputNewExercise: exerciseForm.value,
      },
    });
  }

  modifyExercise(exerciseForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_EXERCISE,
      variables: {
        inputExercise: exerciseForm.value,
      },
    });
  }

  deleteExercise(id: string) {
    return this.apollo.mutate({
      mutation: DEL_EXERCISE,
      variables: {
        exerciseId: id,
      },
    });
  }
}
