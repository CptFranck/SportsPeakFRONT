import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {DEL_MUSCLE} from "../../graphql/operations/muscle.operations";
import {ApolloQueryResult} from "@apollo/client";
import {FormGroup} from "@angular/forms";
import {User} from "../../interface/dto/user";
import {ADD_USER, GET_USERS, MOD_USER} from "../../graphql/operations/user.operations";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);

  constructor() {
    this.getUsers();
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

  addUser(userForm: FormGroup) {
    return this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        inputNewUser: userForm.value,
      },
    }).subscribe(
      (result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "User " + result.data.addUser.username + " been successfully created.";
          this.alertService.addSuccessAlert(message);
        }
      });
  }

  modifyUser(userForm: FormGroup) {
    return this.apollo.mutate({
      mutation: MOD_USER,
      variables: {
        inputUser: userForm.value,
      },
    }).subscribe((result: MutationResult): void => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        let message: string = "User " + result.data.modifyUser.username + " been successfully updated.";
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
      }
    });
  }
}
