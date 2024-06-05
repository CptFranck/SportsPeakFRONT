import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {ADD_MUSCLE, DEL_MUSCLE, GET_MUSCLES, MOD_MUSCLE} from "../../graphql/operations/muscle/muscle.operations";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  private apollo: Apollo = inject(Apollo);

  getMuscles() {
    return this.apollo.watchQuery({
      query: GET_MUSCLES,
    }).valueChanges;
  }

  addMuscle(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_MUSCLE,
      variables: {
        inputNewMuscle: muscleForm.value,
      },
    });
  }

  modifyMuscle(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_MUSCLE,
      variables: {
        inputMuscle: muscleForm.value,
      },
    });
  }

  deleteMuscle(id: string) {
    return this.apollo.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        muscleId: id,
      },
    });
  }
}
