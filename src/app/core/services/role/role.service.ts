import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {DEL_EXERCISE} from "../../graphql/operations/exercise.operations";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {Role} from "../../../shared/model/dto/role";
import {ADD_ROLE, GET_ROLES, MOD_ROLE} from "../../graphql/operations/role.operations";
import {CurrentUserService} from "../current-user/current-user.service";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly roleListSubject = new BehaviorSubject<Role[]>([]);
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(true);

  private readonly alertService = inject(AlertService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.currentUserService.currentUser$.subscribe(() => this.currentUserService.isAdmin() && this.getRoles());
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get roleList$() {
    return this.roleListSubject.asObservable();
  }

  getRoles() {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_ROLES,
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.roleListSubject.next(data.getRoles);
        this.isLoadingSubject.next(loading);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  addRole(roleForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_ROLE,
      variables: {
        inputNewRole: roleForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`Role ${data.addRole.name} has been successfully created.`));
  }

  modifyRole(roleForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_ROLE,
      variables: {
        inputRole: roleForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`Role ${data.modifyRole.name} has been successfully updated.`));
  }

  deleteRole(role: Role) {
    return this.apolloWrapperService.mutate({
      mutation: DEL_EXERCISE,
      variables: {
        roleId: role.id,
      }
    }).subscribe(() =>
      this.alertService.addSuccessAlert(`Role ${role.name} has been successfully deleted.`));
  }
}
