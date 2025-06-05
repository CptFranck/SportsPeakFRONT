import {inject, Injectable} from '@angular/core';
import {MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {FormGroup} from "@angular/forms";
import {
  ADD_TARGET_SET,
  DEL_TARGET_SET,
  MOD_TARGET_SET,
  MOD_TARGET_SET_STATE
} from "../../graphql/operations/target-set.operations";
import {TargetSet} from "../../../shared/model/dto/target-set";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class TargetSetService {

  private readonly alertService = inject(AlertService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  addTargetSet(targetSetForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_TARGET_SET,
      variables: {
        inputNewTargetSet: targetSetForm.value,
      }
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Set ${data.addTargetSet.index} has been successfully created.`);
    });
  }

  modifyTargetSet(targetSetForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_TARGET_SET,
      variables: {
        inputTargetSet: targetSetForm.value,
      }
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Set ${data.modifyTargetSet.index} has been successfully updated.`);
    });
  }

  modifyTargetSetState(targetSetStateForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_TARGET_SET_STATE,
      variables: {
        inputTargetSetState: targetSetStateForm.value,
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert("Set state been successfully updated.");
    });
  }

  deleteTargetSet(targetSet: TargetSet) {
    this.apolloWrapperService.mutate({
      mutation: DEL_TARGET_SET,
      variables: {
        targetSetId: targetSet.id,
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Set ${targetSet.index} has been successfully deleted.`);
    });
  }
}
