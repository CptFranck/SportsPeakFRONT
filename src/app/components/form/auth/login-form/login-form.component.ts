import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {InputControlComponent} from "../../../input-control/input-control.component";

@Component({
  selector: 'app-login-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  loginForm = signal<FormGroup>(new FormGroup({
    login: new FormControl(
      // "",
      "admin@sportspeak.com",
      [Validators.required]),
    password: new FormControl(
      // "",
      "ChangeMeInProd1!",
      [Validators.required]),
  }));
  submitInvalidForm = signal<boolean>(false);

  private readonly authService = inject(AuthService);

  onSubmitLoginForm() {
    const loginForm = this.loginForm();
    if (loginForm.valid) {
      this.submitInvalidForm.set(false);
      this.authService.login(loginForm);
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
