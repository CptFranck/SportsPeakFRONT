import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, REGISTER} from "../../graphql/operations/auth.operations";
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";
import {Auth} from "../../../shared/model/dto/auth";
import {UserLoggedService} from "../user-logged/user-logged.service";
import {TokenService} from "../token/token.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectUrl = "/";
  private readonly isAuthenticated = new BehaviorSubject(false);

  private readonly router = inject(Router);
  private readonly apollo = inject(Apollo);
  private readonly alertService = inject(AlertService);
  private readonly tokenService = inject(TokenService);
  private readonly userLoggedService = inject(UserLoggedService);

  constructor() {
    let isValidTokenSaved: boolean = !!this.tokenService.getCurrentToken();
    let isUserSaved: boolean = !!this.userLoggedService.getCurrentUser();
    if (isValidTokenSaved && isUserSaved)
      this.isAuthenticated.next(true);
    else
      this.removeDataAuth();
  }

  get isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }

  register(registerFormGroup: FormGroup) {
    const inputNewUser = registerFormGroup.value;
    delete inputNewUser.confirmPassword;
    this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        inputRegisterNewUser: inputNewUser,
      },
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      if (data)
        this.setDataAuth(data.register, true);
    });
  }

  login(loginForm: FormGroup) {
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        inputCredentials: loginForm.value,
      },
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      else
        this.setDataAuth(data.login, true);
    });
  }

  logout() {
    this.apollo.client.resetStore().then(() => {
      this.removeDataAuth();
      this.isAuthenticated.next(false);
    });
  }

  setDataAuth(auth: Auth, redirect = false) {
    this.isAuthenticated.next(true);
    this.userLoggedService.setCurrentUser(auth.user);
    this.tokenService.setCurrentToken(auth);
    if (redirect)
      this.router.navigateByUrl(this.redirectUrl).then(() => this.setRedirectUrl('/'));
  }

  setRedirectUrl(redirectUrl: string) {
    this.redirectUrl = redirectUrl;
  }

  isAuthenticationValid() {
    const currentToken = this.tokenService.getCurrentToken();
    const isTokenValid = this.tokenService.isTokenValid(currentToken);
    if (!isTokenValid)
      this.removeDataAuth();
    this.isAuthenticated.next(isTokenValid);
    return isTokenValid;
  }

  private removeDataAuth(redirect = false) {
    this.userLoggedService.removeCurrentUser();
    this.tokenService.removeCurrentToken();
    if (redirect)
      this.router.navigateByUrl('/');
  }
}
