import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {ADD_MUSCLES, DEL_MUSCLES, GET_MUSCLES, MOD_MUSCLES} from "../../graphql/muscle/muscle.operations";
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
      mutation: ADD_MUSCLES,
      variables: {
        inputNewMuscle: muscleForm.value,
      },
    });
  }

  modifyMuscle(muscleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_MUSCLES,
      variables: {
        inputMuscle: muscleForm.value,
      },
    });
  }

  deleteMuscle(id: string) {
    return this.apollo.mutate({
      mutation: DEL_MUSCLES,
      variables: {
        muscleId: id,
      },
    });
  }
}
