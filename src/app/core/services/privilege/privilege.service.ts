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
import {CurrentUserService} from "../current-user/current-user.service";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  private readonly isLoadingSubject = new BehaviorSubject<boolean>(true);
  private readonly privilegeListSubject = new BehaviorSubject<Privilege[]>([]);

  private readonly alertService = inject(AlertService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.currentUserService.currentUser$.subscribe(() => this.currentUserService.isAdmin() && this.getPrivileges());
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  get privilegeList$() {
    return this.privilegeListSubject.asObservable();
  }

  getPrivileges() {
    this.isLoadingSubject.next(true)
    this.apolloWrapperService.watchQuery({
      query: GET_PRIVILEGES,
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.privilegeListSubject.next(data.getPrivileges);
        this.isLoadingSubject.next(loading);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  addPrivilege(privilegeForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: ADD_PRIVILEGE,
      variables: {
        inputNewPrivilege: privilegeForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`Privilege ${data.addPrivilege.name} created successfully.`));
  }

  modifyPrivilege(privilegeForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_PRIVILEGE,
      variables: {
        inputPrivilege: privilegeForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`Privilege ${data.modifyPrivilege.name} has been successfully updated.`));
  }

  deletePrivilege(privilege: Privilege) {
    this.apolloWrapperService.mutate({
      mutation: DEL_PRIVILEGE,
      variables: {
        privilegeId: privilege.id,
      }
    }).subscribe(() =>
      this.alertService.addSuccessAlert(`Privilege ${privilege.name} has been successfully deleted.`));
  }
}
