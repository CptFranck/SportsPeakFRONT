import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, REFRESH_TOKEN, REGISTER} from "../../graphql/operations/auth.operations";
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";
import {Auth} from "../../../shared/model/dto/auth";
import {CurrentUserService} from "../current-user/current-user.service";
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
  private readonly currentUserService = inject(CurrentUserService);

  get isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }

  register(registerForm: FormGroup) {
    const inputNewUser = registerForm.value;
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

  refreshToken() {
    this.apollo.mutate({
      mutation: REFRESH_TOKEN
    }).subscribe(({data, errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      else
        this.setDataAuth(data.refreshToken, true);
    });
  }

  logout() {
    this.apollo.mutate({
      mutation: REFRESH_TOKEN
    }).subscribe(({errors}: MutationResult) => errors &&
      this.alertService.graphQLErrorAlertHandler(errors));
    // Reset apollo cache
    this.apollo.client.resetStore().then(() => {
      this.removeDataAuth();
      this.isAuthenticated.next(false);
    });
  }

  setDataAuth(auth: Auth, redirect = false) {
    this.isAuthenticated.next(true);
    this.currentUserService.setCurrentUser(auth.user);
    this.tokenService.setAuthToken(auth);
    if (redirect)
      this.router.navigateByUrl(this.redirectUrl).then(() => this.setRedirectUrl('/'));
  }

  setRedirectUrl(redirectUrl: string) {
    this.redirectUrl = redirectUrl;
  }

  isAuthenticationValid() {
    const currentToken = this.tokenService.getAuthToken();
    const isTokenValid = this.tokenService.isTokenValid(currentToken);
    this.isAuthenticated.next(isTokenValid);
    if (isTokenValid)
      return true
    this.refreshToken()
    this.removeDataAuth();
    return isTokenValid;
  }

  private removeDataAuth(redirect = false) {
    this.currentUserService.removeCurrentUser();
    this.tokenService.removeAuthToken();
    if (redirect)
      this.router.navigateByUrl('/');
  }
}
