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
import {UserLoggedService} from "../user-logged/user-logged.service";
import {Auth} from "../../../shared/model/dto/auth";
import {DEL_MUSCLE} from "../../graphql/operations/muscle.operations";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = new BehaviorSubject<User[]>([]);
  isLoading = new BehaviorSubject<boolean>(true);

  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly userLoggedService = inject(UserLoggedService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    this.userLoggedService.currentUser$.subscribe(() => this.userLoggedService.isAdmin() && this.getUsers());
  }

  getUsers() {
    this.isLoading.next(true);
    this.apolloWrapperService.watchQuery({
      query: GET_USERS,
    }).valueChanges.subscribe({
      next: ({data, errors, loading}
             :
             ApolloQueryResult<any>
      ) => {
        if (errors)
          this.alertService.graphQLErrorAlertHandler(errors);
        this.users.next(data.getUsers);
        this.isLoading.next(loading);
      },
      error: () => this.isLoading.next(false),
    });
  }

  modifyUserRoles(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_ROLES,
      variables: {
        inputUserRoles: userForm.value,
      }
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`User ${data.modifyUserRoles.username} been successfully updated.`);
    });
  }

  //////////////////// CurrentUser  ///////////////////////

  modifyUserEmail(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_EMAIL,
      variables: {
        inputUserEmail: userForm.value,
      },
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      const auth: Auth = data.modifyUserEmail;
      this.alertService.addSuccessAlert(`User ${auth.user.username} been successfully updated.`);
      this.authService.setDataAuth(auth)
      this.userLoggedService.setCurrentUser(auth.user);
    });
  }

  modifyUserUsername(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_USERNAME,
      variables: {
        inputUserUsername: userForm.value,
      },
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`User ${data.modifyUserUsername.username} been successfully updated.`);
      this.userLoggedService.setCurrentUser(data.modifyUserUsername);
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
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`User ${data.modifyUserPassword.username} been successfully updated.`);
      this.userLoggedService.setCurrentUser(data.modifyUserPassword);
    });
  }

  modifyUserIdentity(userForm: FormGroup) {
    this.apolloWrapperService.mutate({
      mutation: MOD_USER_IDENTITY,
      variables: {
        inputUserIdentity: userForm.value,
      }
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`User ${data.modifyUserIdentity.username} been successfully updated.`);
      this.userLoggedService.setCurrentUser(data.modifyUserIdentity);
    });
  }

  deleteUser(user: User) {
    this.apolloWrapperService.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        userId: user.id,
      },
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`User ${user.username} been successfully deleted.`);
      this.authService.logout();
    });
  }
}
