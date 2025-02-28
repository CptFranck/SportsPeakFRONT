import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {Privilege} from "../../interface/dto/privilege";
import {
  ADD_PRIVILEGE,
  DEL_PRIVILEGE,
  GET_PRIVILEGES,
  MOD_PRIVILEGE
} from "../../graphql/operations/privilege.operations";
import {UserLoggedService} from "../user-logged/user-logged.service";

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  privileges: BehaviorSubject<Privilege[]> = new BehaviorSubject<Privilege[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly apollo: Apollo = inject(Apollo);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);

  constructor() {
    this.userLoggedService.currentUser.subscribe(() => {
      if (this.userLoggedService.isAdmin()) {
        this.getPrivileges();
      }
    })
  }

  getPrivileges() {
    this.isLoading.next(true)
    return this.apollo.watchQuery({
      query: GET_PRIVILEGES,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.privileges.next(result.data.getPrivileges);
      this.isLoading.next(result.loading);
    });
  }

  addPrivilege(privilegeForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_PRIVILEGE,
      variables: {
        inputNewPrivilege: privilegeForm.value,
      },
      refetchQueries: [{
        query: GET_PRIVILEGES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Privilege " + result.data.addPrivilege.name + " been successfully created."
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyPrivilege(privilegeForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_PRIVILEGE,
      variables: {
        inputPrivilege: privilegeForm.value,
      },
      refetchQueries: [{
        query: GET_PRIVILEGES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Privilege " + result.data.modifyPrivilege.name + " has been successfully updated."
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deletePrivilege(privilegeForm: Privilege) {
    return this.apollo.mutate({
      mutation: DEL_PRIVILEGE,
      variables: {
        privilegeId: privilegeForm.id,
      },
      refetchQueries: [{
        query: GET_PRIVILEGES,
      }]
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Privilege " + privilegeForm.name + " has been successfully deleted."
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
