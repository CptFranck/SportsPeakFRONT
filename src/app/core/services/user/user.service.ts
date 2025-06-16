import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {User} from "../../../shared/model/dto/user";
import {
  GET_USERS,
  MOD_USER_EMAIL,
  MOD_USER_IDENTITY,
  MOD_USER_PASSWORD,
  MOD_USER_ROLES,
  MOD_USER_USERNAME
} from "../../graphql/operations/user.operations";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";
import {CurrentUserService} from "../current-user/current-user.service";
import {Auth} from "../../../shared/model/dto/auth";
import {DEL_MUSCLE} from "../../graphql/operations/muscle.operations";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userListSubject = new BehaviorSubject<User[]>([]);
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(true);

  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.currentUserService.currentUser$.subscribe(() => this.currentUserService.isAdmin() && this.getUsers());
  }

  get userList$() {
    return this.userListSubject.asObservable();
  }

  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  getUsers() {
    this.isLoadingSubject.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_USERS,
    }).valueChanges.subscribe({
      next: ({data, loading}: ApolloQueryResult<any>) => {
        this.userListSubject.next(data.getUsers);
        this.isLoadingSubject.next(loading);
      },
      error: () => this.isLoadingSubject.next(false),
    });
  }

  modifyUserRoles(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_ROLES,
      variables: {
        inputUserRoles: userForm.value,
      }
    }).subscribe(({data}: MutationResult) =>
      this.alertService.addSuccessAlert(`User ${data.modifyUserRoles.username} been successfully updated.`));
  }

  //////////////////// CurrentUser  ///////////////////////

  modifyUserEmail(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_EMAIL,
      variables: {
        inputUserEmail: userForm.value,
      },
    }).subscribe(({data}: MutationResult) => {
      const auth: Auth = data.modifyUserEmail;
      this.alertService.addSuccessAlert(`User ${auth.user.username} been successfully updated.`);
      this.authService.setDataAuth(auth)
    });
  }

  modifyUserUsername(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_USERNAME,
      variables: {
        inputUserUsername: userForm.value,
      },
    }).subscribe(({data}: MutationResult) => {
      this.alertService.addSuccessAlert(`User ${data.modifyUserUsername.username} been successfully updated.`);
      this.currentUserService.setCurrentUser(data.modifyUserUsername);
    });
  }

  modifyUserPassword(userForm: FormGroup) {
    let inputUserPassword = userForm.value
    delete inputUserPassword.confirmPassword
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_PASSWORD,
      variables: {
        inputUserPassword: inputUserPassword,
      },
    }).subscribe(({data}: MutationResult) => {
      this.alertService.addSuccessAlert(`User ${data.modifyUserPassword.username} been successfully updated.`);
      this.currentUserService.setCurrentUser(data.modifyUserPassword);
    });
  }

  modifyUserIdentity(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_IDENTITY,
      variables: {
        inputUserIdentity: userForm.value,
      }
    }).subscribe(({data}: MutationResult) => {
      this.alertService.addSuccessAlert(`User ${data.modifyUserIdentity.username} been successfully updated.`);
      this.currentUserService.setCurrentUser(data.modifyUserIdentity);
    });
  }

  deleteUser(user: User) {
    this.apolloWrapperService.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        userId: user.id,
      },
    }).subscribe(() => {
      this.alertService.addSuccessAlert(`User ${user.username} been successfully deleted.`);
      this.authService.logout();
    });
  }
}
