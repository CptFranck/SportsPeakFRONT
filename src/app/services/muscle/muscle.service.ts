import {inject, Injectable} from '@angular/core';
import {Muscle} from "../../interface/dto/muscle";
import {Apollo, MutationResult} from "apollo-angular";
import {Observable, Subject} from "rxjs";
import {ADD_MUSCLES, DEL_MUSCLES, GET_MUSCLES, MOD_MUSCLES} from "../../graphql/muscle/muscle.operations";
import {ApolloQueryResult} from "@apollo/client/core/types";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  private apollo: Apollo = inject(Apollo);
  private muscleSubject: Subject<Observable<ApolloQueryResult<Muscle[]>>> =
    new Subject<Observable<ApolloQueryResult<Muscle[]>>>();

  constructor() {
    this.updateAlert();
  }

  updateAlert() {
    this.muscleSubject.next(this.getMuscles());
  }

  getMuscleSubject(): Subject<Observable<ApolloQueryResult<Muscle[]>>> {
    return this.muscleSubject;
  }

  getMuscles(): Observable<ApolloQueryResult<Muscle[]>> {
    const observable = this.apollo.watchQuery<Muscle[]>({
      query: GET_MUSCLES,
    }).valueChanges;
    this.updateAlert();
    return observable;
  }

  addMuscle(muscleForm: FormGroup): Observable<MutationResult<Muscle>> {
    const observable = this.apollo.mutate<Muscle>({
      mutation: ADD_MUSCLES,
      variables: {
        inputNewMuscle: muscleForm.value,
      },
    })
    this.updateAlert();
    return observable;
  }

  modifyMuscle(muscleForm: FormGroup): Observable<MutationResult<Muscle>> {
    const observable = this.apollo.mutate<Muscle>({
      mutation: MOD_MUSCLES,
      variables: {
        inputMuscle: muscleForm.value,
      },
    })
    this.updateAlert();
    return observable;
  }


  deleteMuscle(id: string): Observable<MutationResult<number>> {
    const observable = this.apollo.mutate<number>({
      mutation: DEL_MUSCLES,
      variables: {
        muscleId: id,
      },
    })
    this.updateAlert();
    return observable;
  }
}
