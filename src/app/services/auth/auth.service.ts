import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {FormGroup} from "@angular/forms";
import {LOGIN, REGISTER} from "../../graphql/operations/login/login.operations";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apollo: Apollo = inject(Apollo);

  login(loginForm: FormGroup) {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        inputLogin: loginForm.value,
      },
    });
  }

  register(registerFormGroup: FormGroup) {
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        inputRegister: registerFormGroup.value,
      },
    });
  }
}
