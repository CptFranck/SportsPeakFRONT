import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, REGISTER} from "../../graphql/operations/auth.operations";
import {BehaviorSubject} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";
import {Auth} from "../../interface/dto/auth";
import {UserLoggedService} from "../userLogged/user-logged.service";
import {TokenService} from "../token/token.service";
import {AuthToken} from "../../interface/dto/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private router: Router = inject(Router);
  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);
  private tokenService: TokenService = inject(TokenService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  constructor() {
    let isValidTokenSaved: boolean = !!this.tokenService.getCurrentToken();
    let isUserSaved: boolean = !!this.userLoggedService.getCurrentUser();
    if (isValidTokenSaved && isUserSaved)
      this.isAuthenticated.next(true);
    else
      this.removeDataAuth();
  }

  register(registerFormGroup: FormGroup) {
    let inputNewUser = registerFormGroup.value
    delete inputNewUser.confirmPassword
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        inputRegisterNewUser: inputNewUser,
      },
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      if (result.data) {
        this.setDataAuth(result.data.register, true);
      }
    });
  }

  login(loginForm: FormGroup) {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        inputCredentials: loginForm.value,
      },
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        this.setDataAuth(result.data.login, true);
      }
    });
  }

  logout() {
    this.apollo.client.resetStore().then(() => {
      this.removeDataAuth(true)
      this.isAuthenticated.next(false);
    });
  }

  setDataAuth(auth: Auth, redirect: boolean = false) {
    this.isAuthenticated.next(true);
    this.userLoggedService.setCurrentUser(auth.user);
    let authToken: AuthToken = this.createAuthToken(auth);
    this.tokenService.setCurrentToken(authToken);
    if (redirect) {
      this.router.navigateByUrl('/')
    }
  }

  private removeDataAuth(redirect: boolean = false) {
    console.log("authService")
    this.userLoggedService.removeCurrentUser();
    this.tokenService.removeCurrentToken();
    if (redirect) {
      this.router.navigateByUrl('/')
    }
  }

  private createAuthToken(data: Auth) {
    const authToken: AuthToken = {
      tokenType: data.tokenType,
      accessToken: data.accessToken,
      expiration: new Date(data.expiration)
    };
    return authToken;
  }
}
