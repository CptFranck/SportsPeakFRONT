import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {Privilege} from "../../../shared/model/dto/privilege";
import {
  ADD_PRIVILEGE,
  DEL_PRIVILEGE,
  GET_PRIVILEGES,
  MOD_PRIVILEGE
} from "../../graphql/operations/privilege.operations";
import {UserLoggedService} from "../user-logged/user-logged.service";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  privileges = new BehaviorSubject<Privilege[]>([]);
  isLoading = new BehaviorSubject<boolean>(true);

  private readonly alertService = inject(AlertService);
  private readonly userLoggedService = inject(UserLoggedService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.userLoggedService.currentUser.subscribe(() => this.userLoggedService.isAdmin() ? this.getPrivileges() : null)
  }

  getPrivileges() {
    this.isLoading.next(true)
    this.apolloWrapperService.watchQuery({
      query: GET_PRIVILEGES,
    }).valueChanges.subscribe({
      next: ({data, errors, loading}: ApolloQueryResult<any>) => {
        if (errors)
          this.alertService.graphQLErrorAlertHandler(errors);
        this.privileges.next(data.getPrivileges);
        this.isLoading.next(loading);
      },
      error: () => this.isLoading.next(false),
    });
  }

  addPrivilege(privilegeForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_PRIVILEGE,
      variables: {
        inputNewPrivilege: privilegeForm.value,
      }
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Privilege ${data.addPrivilege.name} created successfully.`);
    });
  }

  modifyPrivilege(privilegeForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_PRIVILEGE,
      variables: {
        inputPrivilege: privilegeForm.value,
      }
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Privilege ${data.modifyPrivilege.name} has been successfully updated.`);
    });
  }

  deletePrivilege(privilege: Privilege) {
    this.apolloWrapperService.mutate({
      mutation: DEL_PRIVILEGE,
      variables: {
        privilegeId: privilege.id,
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`Privilege ${privilege.name} has been successfully deleted.`);
    });
  }
}
