import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, REGISTER} from "../../graphql/operations/auth/auth.operations";
import {BehaviorSubject} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";
import {Auth} from "../../interface/dto/auth";
import {UserLoggedService} from "../userLogged/user-logged.service";
import {TokenService} from "../token/token.service";
import {AuthToken} from "../../interface/dto/token";
import {ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private router: Router = inject(Router);
  private apollo: Apollo = inject(Apollo);
  private userService: UserLoggedService = inject(UserLoggedService);
  private alertService: AlertService = inject(AlertService);
  private tokenService: TokenService = inject(TokenService);

  constructor() {
    let isValidTokenSaved: boolean = !!this.tokenService.getCurrentToken();
    let isUserSaved: boolean = !!this.userService.getCurrentUser();
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
        inputNewUser: inputNewUser,
      },
    }).subscribe((result: MutationResult) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      }
      if (result.data) {
        this.setDataAuth(result.data.register);
      }
    });
  }

  login(loginForm: FormGroup) {
    return this.apollo.query({
      query: LOGIN,
      variables: {
        inputCredentials: loginForm.value,
      },
    }).subscribe((result: ApolloQueryResult<any>) => {
      if (result.errors) {
        this.alertService.graphQLErrorAlertHandler(result.errors);
      } else {
        this.setDataAuth(result.data.login);
      }
    });
  }

  logout() {
    this.apollo.client.resetStore().then(() => {
      this.removeDataAuth()
      this.isAuthenticated.next(false);
    });
  }

  setDataAuth(auth: Auth) {
    this.router.navigateByUrl('/').then(() => {
      this.isAuthenticated.next(true);
      this.userService.setCurrentUser(auth.user);
      let authToken: AuthToken = this.createAuthToken(auth);
      this.tokenService.setCurrentToken(authToken);
    });
  }

  removeDataAuth() {
    this.userService.removeCurrentUser();
    this.tokenService.removeCurrentToken();
  }

  createAuthToken(data: Auth) {
    const authToken: AuthToken = {
      tokenType: data.tokenType,
      accessToken: data.accessToken,
      expiration: new Date(data.expiration)
    };
    return authToken;
  }
}
