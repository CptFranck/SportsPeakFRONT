import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {DEL_MUSCLE} from "../../graphql/operations/muscle.operations";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {User} from "../../interface/dto/user";
import {
  GET_USERS,
  MOD_USER_EMAIL,
  MOD_USER_IDENTITY,
  MOD_USER_PASSWORD,
  MOD_USER_ROLES,
  MOD_USER_USERNAME
} from "../../graphql/operations/user.operations";
import {UserLoggedService} from "../user-logged/user-logged.service";
import {AuthService} from "../auth/auth.service";
import {Auth} from "../../interface/dto/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apollo: Apollo = inject(Apollo);
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  constructor() {
    this.userLoggedService.currentUser.subscribe(() => {
      if (this.userLoggedService.isAdmin()) {
        this.getUsers();
      }
    })
  }

  getUsers() {
    return this.apollo.watchQuery({
      query: GET_USERS,
    }).valueChanges.subscribe((result: ApolloQueryResult<any>): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      this.users.next(result.data.getUsers);
      this.isLoading.next(result.loading);
    });
  }

  modifyUserIdentity(userForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_USER_IDENTITY,
      variables: {
        inputUserIdentity: userForm.value,
      },
      refetchQueries: [{
        query: GET_USERS,
      }]
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "User " + result.data.modifyUserIdentity.username + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
        this.userLoggedService.setCurrentUser(result.data.modifyUserIdentity);
      }
    });
  }

  modifyUserRoles(userForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_USER_ROLES,
      variables: {
        inputUserRoles: userForm.value,
      },
      refetchQueries: [{
        query: GET_USERS,
      }]
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "User " + result.data.modifyUserRoles.username + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  modifyUserEmail(userForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_USER_EMAIL,
      variables: {
        inputUserEmail: userForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        const auth: Auth = result.data.modifyUserEmail;
        let message: string = "User " + auth.user.username + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
        this.authService.setDataAuth(auth)
        this.userLoggedService.setCurrentUser(auth.user);
      }
    });
  }

  modifyUserUsername(userForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_USER_USERNAME,
      variables: {
        inputUserUsername: userForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "User " + result.data.modifyUserUsername.username + " been successfully updated.";
        this.alertService.addSuccessAlert(message);
        this.userLoggedService.setCurrentUser(result.data.modifyUserUsername);
      }
    });
  }

  modifyUserPassword(userForm: FormGroup) {
    let inputUserPassword = userForm.value
    delete inputUserPassword.confirmPassword
    return this.apollo.mutate({
      mutation: MOD_USER_PASSWORD,
      variables: {
        inputUserPassword: inputUserPassword,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "User " + result.data.modifyUserPassword.username + " been successfully updated.";
        this.userLoggedService.setCurrentUser(result.data.modifyUserPassword);
        this.alertService.addSuccessAlert(message);
      }
    });
  }

  deleteUser(user: User) {
    return this.apollo.mutate({
      mutation: DEL_MUSCLE,
      variables: {
        userId: user.id,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "User " + user.username + " has been successfully deleted.";
        this.alertService.addSuccessAlert(message);
        this.authService.logout();
      }
    });
  }
}
