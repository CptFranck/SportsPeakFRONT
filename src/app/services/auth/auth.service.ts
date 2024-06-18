import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, REGISTER} from "../../graphql/operations/auth/auth.operations";
import {LocalStorageService} from "../localStorage/local-storage.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  apollo: Apollo = inject(Apollo);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.localStorageService.removeData("accessToken")
    this.localStorageService.removeData("tokenType")
    this.isAuthenticated.next(!!this.localStorageService.getData("accessToken"));
  }

  login(loginForm: FormGroup) {
    return this.apollo.watchQuery({
      query: LOGIN,
      variables: {
        inputCredentials: loginForm.value,
      },
    }).valueChanges;
  }

  register(registerFormGroup: FormGroup) {
    let inputNewUser = registerFormGroup.value
    delete inputNewUser.confirmPassword
    console.log(inputNewUser)
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        inputNewUser: inputNewUser,
      },
    });
  }

  logout() {
    this.apollo.client.resetStore().then(() => {
      this.localStorageService.removeData("accessToken")
      this.localStorageService.removeData("tokenType")
    });
    this.isAuthenticated.next(false);
  }
}
