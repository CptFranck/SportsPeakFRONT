import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, REGISTER} from "../../graphql/operations/auth/auth.operations";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apollo: Apollo = inject(Apollo);

  login(loginForm: FormGroup) {
    console.log(loginForm.value)
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
}
