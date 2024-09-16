import {Component} from '@angular/core';
import {LoginFormComponent} from "../../../components/form/auth/login-form/login-form.component";
import {RegisterFormComponent} from "../../../components/form/auth/register-form/register-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  styleUrl: "auth.component.css",
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  loginTabId: string = "loginTabId"
  registerTabId: string = "registerTabId"
}
