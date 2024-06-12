import {Component} from '@angular/core';
import {LoginFormComponent} from "../login-form/login-form.component";
import {RegisterFormComponent} from "../register-form/register-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  styleUrl: "login-component.css",
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginTabId: string = "loginTabId"
  registerTabId: string = "registerTabId"
}
