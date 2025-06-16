import {inject, Injectable} from '@angular/core';
import {MutationResult} from "apollo-angular";
import {
  ADD_MUSCLE,
  DEL_MUSCLE,
  FRAG_MUSCLE_ILLUSTRATION,
  GET_MUSCLE_BY_ID,
  GET_MUSCLES,
  MOD_MUSCLE
} from "../../graphql/operations/muscle.operations";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Muscle} from "../../../shared/model/dto/muscle";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MuscleService {

  private readonly isLoadingSubject = new BehaviorSubject<boolean>(true);
  private readonly muscleListSubject = new BehaviorSubject<Muscle[]>([]);
  private readonly selectedMuscleSubject = new BehaviorSubject<Muscle | undefined>(undefined);

  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.getMuscles();
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get muscleList$() {
    return this.muscleListSubject.asObservable();
  }

  get selectedMuscle$() {
    return this.selectedMuscleSubject.asObservable();
  }

  getMuscles() {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_MUSCLES,
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.muscleListSubject.next(data.getMuscles);
        this.isLoadingSubject.next(loading);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  getMuscleById(id: number) {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_MUSCLE_BY_ID,
      variables: {id: id}
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.selectedMuscleSubject.next(data.getMuscleById);
        this.isLoadingSubject.next(loading);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  addMuscle(muscleForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_MUSCLE,
      variables: {
        inputNewMuscle: muscleForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert("Muscle " + data.addMuscle.name + " been successfully created."));
  }

  modifyMuscle(muscleForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_MUSCLE,
      variables: {
        inputMuscle: muscleForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert("Muscle " + data.modifyMuscle.name + " been successfully updated."));
  }

  deleteMuscle(muscle: Muscle) {
    this.apolloWrapperService.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        muscleId: muscle.id,
      }
    }).subscribe(() => {
      this.router.navigateByUrl('/docs/muscles');
      this.alertService.addSuccessAlert(`Muscle ${muscle.name} has been successfully deleted.`);
    });
  }

  updateIllustrationMuscle(id: number, url: string) {
    this.apolloWrapperService.updateCache(id, "Muscle", "illustrationPath", url, FRAG_MUSCLE_ILLUSTRATION)
  }
}
