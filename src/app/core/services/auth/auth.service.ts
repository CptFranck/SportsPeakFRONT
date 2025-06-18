import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, LOGOUT, REFRESH_TOKEN, REGISTER} from "../../graphql/operations/auth.operations";
import {Router} from "@angular/router";
import {Auth} from "../../../shared/model/dto/auth";
import {CurrentUserService} from "../current-user/current-user.service";
import {TokenService} from "../token/token.service";
import {BehaviorSubject} from "rxjs";
import {AuthState} from "../../../shared/model/enum/authState";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectUrl = "/";
  private redirectNeeded = false;

  private readonly isAuthenticatedSubject = new BehaviorSubject<AuthState>(AuthState.unknown);

  private readonly router = inject(Router);
  private readonly apollo = inject(Apollo);
  private readonly tokenService = inject(TokenService);
  private readonly currentUserService = inject(CurrentUserService);

  constructor() {
    this.refreshToken();
    this.tokenService.isAuthTokenExpired$.subscribe((isExpired) => isExpired && this.refreshToken());
  }

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  register(registerForm: FormGroup) {
    const inputNewUser = registerForm.value;
    delete inputNewUser.confirmPassword;
    this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        inputRegisterNewUser: inputNewUser,
      },
    }).subscribe(({data}: MutationResult) => data && this.setDataAuth(data.register, true));
  }

  login(loginForm: FormGroup) {
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        inputCredentials: loginForm.value,
      },
    }).subscribe(({data}: MutationResult) => data && this.setDataAuth(data.login, true));
  }

  refreshToken() {
    this.apollo.mutate({
      mutation: REFRESH_TOKEN
    }).subscribe({
      next: ({data}: MutationResult) => {
        if (data?.refreshToken)
          this.setDataAuth(data.refreshToken, true);
        else
          this.removeDataAuth();
      },
      error: () => this.removeDataAuth()
    });
  }

  logout() {
    this.apollo.mutate({mutation: LOGOUT})
      .subscribe(({data}: MutationResult) => null);
    // Reset apollo cache
    this.apollo.client.resetStore().then(() => {
      this.removeDataAuth();
    });
  }

  setDataAuth(auth: Auth, redirect = false) {
    this.tokenService.setAuthToken(auth);
    this.currentUserService.setCurrentUser(auth.user);
    this.isAuthenticatedSubject.next(AuthState.authenticated);
    if (redirect && this.redirectNeeded) {
      this.router.navigateByUrl(this.redirectUrl);
      this.redirectNeeded = true;
    }
  }

  setRedirectUrl(redirectUrl: string) {
    this.redirectUrl = redirectUrl;
    this.redirectNeeded = true;
  }

  private removeDataAuth(redirect = false) {
    this.currentUserService.removeCurrentUser();
    this.isAuthenticatedSubject.next(AuthState.unauthenticated);
    if (redirect) this.router.navigateByUrl('/');
  }
}
