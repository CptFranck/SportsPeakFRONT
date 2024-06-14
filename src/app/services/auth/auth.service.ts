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
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        inputCredentials: loginForm.value,
      },
    });
  }

  register(registerFormGroup: FormGroup) {
    console.log(registerFormGroup.value)
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        inputNewUser: registerFormGroup.value,
      },
    });
  }
}
