import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User} from "../../interface/dto/user";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {
  MOD_USER_EMAIL,
  MOD_USER_IDENTITY,
  MOD_USER_PASSWORD,
  MOD_USER_USERNAME
} from "../../graphql/operations/user.operations";
import {MutationResult} from "apollo-angular";
import {Auth} from "../../interface/dto/auth";
import {DEL_MUSCLE} from "../../graphql/operations/muscle.operations";
import {AuthService} from "../auth/auth.service";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";
import {AlertService} from "../alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  currentUser = new BehaviorSubject<User | undefined>(undefined);

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  constructor() {
    let user: User | null = this.getSavedUser();
    if (user) this.currentUser.next(user);
  }

  getCurrentUser() {
    return this.currentUser.value;
  }

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
      this.setCurrentUser(auth.user);
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
      this.setCurrentUser(data.modifyUserUsername);
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
      this.setCurrentUser(data.modifyUserPassword);
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
      this.setCurrentUser(data.modifyUserIdentity);
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


  setCurrentUser(user: User) {
    this.currentUser.next(user);
    let userJson: string = JSON.stringify(user);
    this.localStorageService.saveData("user", userJson);
  }

  removeCurrentUser() {
    this.currentUser.next(undefined);
    this.localStorageService.removeData("user");
  }

  isStaff() {
    const user = this.currentUser.value;
    if (user)
      return user.roles.some(role => role.name === "ROLE_STAFF" || role.name === "ROLE_ADMIN");
    return false;
  }

  isAdmin() {
    const user = this.currentUser.value;
    if (user)
      return user.roles.some(role => role.name === "ROLE_ADMIN");
    return false;
  }

  private getSavedUser(): User | null {
    let userJson: string | null = this.localStorageService.getData("user");
    if (userJson)
      return JSON.parse(userJson);
    return null;
  }
}
