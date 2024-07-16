import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {FormGroup} from "@angular/forms";
import {
  ADD_TARGET_SET,
  ADD_TARGET_SET_EVOLUTION,
  DEL_TARGET_SET,
  MOD_TARGET_SET
} from "../../graphql/operations/target-set.operations";
import {TargetSet} from "../../interface/dto/target-set";

@Injectable({
  providedIn: 'root'
})
export class TargetSetService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);

  addTargetSet(targetSetForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_TARGET_SET,
      variables: {
        inputNewProgExercise: targetSetForm.value,
      },
    }).subscribe(
      (result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Set " + result.data.addTargetSet.id + " been successfully created.";
          this.alertService.addSuccessAlert(message);
        }
      });
  }

  addTargetSetEvolution(progExercisesForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_TARGET_SET_EVOLUTION,
      variables: {
        inputProgExerciseTrustLabel: progExercisesForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Set " + result.data.addTargetSetEvolution.id + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyTargetSet(targetSetForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_TARGET_SET,
      variables: {
        inputProgExercise: targetSetForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Set " + result.data.modifyTargetSet.id + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteTargetSet(targetSet: TargetSet) {
    return this.apollo.mutate({
      mutation: DEL_TARGET_SET,
      variables: {
        muscleId: targetSet.id,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Set " + targetSet.id + " has been successfully deleted.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
