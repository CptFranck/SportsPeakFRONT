import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {FormGroup} from "@angular/forms";
import {
  ADD_TARGET_SET,
  DEL_TARGET_SET,
  MOD_TARGET_SET,
  MOD_TARGET_SET_STATE
} from "../../graphql/operations/target-set.operations";
import {TargetSet} from "../../interface/dto/target-set";

@Injectable({
  providedIn: 'root'
})
export class TargetSetService {

  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);

  addTargetSet(targetSetForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_TARGET_SET,
      variables: {
        inputNewTargetSet: targetSetForm.value,
      },
    }).subscribe(
      (result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Set " + result.data.addTargetSet.index + " been successfully created.";
          this.alertService.addSuccessAlert(message);
        }
      });
  }

  modifyTargetSet(targetSetForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_TARGET_SET,
      variables: {
        inputTargetSet: targetSetForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Set " + result.data.modifyTargetSet.index + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyTargetSetState(targetSetStateForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_TARGET_SET_STATE,
      variables: {
        inputTargetSetState: targetSetStateForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Set state been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteTargetSet(targetSet: TargetSet) {
    return this.apollo.mutate({
      mutation: DEL_TARGET_SET,
      variables: {
        targetSetId: targetSet.id,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Set " + targetSet.index + " has been successfully deleted.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
