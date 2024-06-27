import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {DEL_EXERCISE} from "../../graphql/operations/exercise.operations";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {Role} from "../../interface/dto/role";
import {ADD_ROLE, GET_ROLES, MOD_ROLE} from "../../graphql/operations/role.operations";
import {UserLoggedService} from "../userLogged/user-logged.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  constructor() {
    this.userLoggedService.currentUser.subscribe(() => {
      if (this.userLoggedService.isAdmin()) {
        this.getRoles();
      }
    })
  }

  getRoles() {
    return this.apollo.watchQuery({
      query: GET_ROLES,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.roles.next(result.data.getRoles);
      this.isLoading.next(result.loading);
    });
  }

  addRole(roleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_ROLE,
      variables: {
        inputNewRole: roleForm.value,
      },
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Role " + result.data.addRole.name + " been successfully created."
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyRole(roleForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_ROLE,
      variables: {
        inputRole: roleForm.value,
      },
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Role " + result.data.modifyRole.name + " has been successfully updated."
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteRole(role: Role) {
    return this.apollo.mutate({
      mutation: DEL_EXERCISE,
      variables: {
        roleId: role.id,
      },
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "Role " + role.name + " has been successfully deleted."
        this.alertService.addSuccessAlert(message);
      }
    });
  }
}
