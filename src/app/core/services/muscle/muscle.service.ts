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

  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  private muscleListSubject = new BehaviorSubject<Muscle[]>([]);
  private selectedMuscleSubject = new BehaviorSubject<Muscle | undefined>(undefined);

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
      next: ({data, errors, loading}: ApolloQueryResult<any>) => {
        if (errors)
          this.alertService.graphQLErrorAlertHandler(errors);
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
      next: ({data, errors, loading}: ApolloQueryResult<any>) => {
        if (errors)
          this.alertService.graphQLErrorAlertHandler(errors);
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
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      const message: string = "Muscle " + data.addMuscle.name + " been successfully created.";
      this.alertService.addSuccessAlert(message);
    });
  }

  modifyMuscle(muscleForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_MUSCLE,
      variables: {
        inputMuscle: muscleForm.value,
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      const message: string = "Muscle " + data.modifyMuscle.name + " been successfully updated.";
      this.alertService.addSuccessAlert(message);
    });
  }

  deleteMuscle(muscle: Muscle) {
    this.apolloWrapperService.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        muscleId: muscle.id,
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Muscle ${muscle.name} has been successfully deleted.`);
      this.router.navigateByUrl('/docs/muscles');
    });
  }

  updateIllustrationMuscle(id: number, url: string) {
    this.apolloWrapperService.updateCache(id, "Muscle", "illustrationPath", url, FRAG_MUSCLE_ILLUSTRATION)
  }
}
