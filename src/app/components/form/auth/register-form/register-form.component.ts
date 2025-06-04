import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {confirmValidator} from "../../../../shared/validators/confirmValidator";

@Component({
  selector: 'app-register-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  submitInvalidForm = signal<boolean>(false);

  private draft = {
    "firstName": "Admin",
    "lastName": "Admin",
    "username": "admin",
    "email": "admin@sportspeak.com",
    "password": "ChangeMeInProd1!",
    "confirmPassword": "ChangeMeInProd1!"
  }
  registerFormGroup = signal<FormGroup>(new FormGroup({
      firstName: new FormControl(
        // "",
        this.draft.firstName,
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)]),
      lastName: new FormControl(
        // "",
        this.draft.lastName,
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)]),
      username: new FormControl(
        // "",
        this.draft.username,
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('([a-zA-Z0-9_]+)[^\\s\\t\\n\\r]{1,}')]),
      email: new FormControl(
        // "",
        this.draft.email,
        [Validators.required,
          Validators.email]),
      password: new FormControl(
        // "",
        this.draft.password,
        [Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          Validators.pattern('^(?=.*\\d)(?=.*[a-z]+)(?=.*[A-Z]+)[^\\s\\t\\n\\r]{10,}$')
        ]),
      confirmPassword: new FormControl(
        // "",
        this.draft.confirmPassword,
        [Validators.required],
      ),
    },
    {
      validators: confirmValidator('password', 'confirmPassword')
    }));

  private readonly authService = inject(AuthService);

  onSubmitRegisterForm() {
    const registerFormGroup = this.registerFormGroup();
    if (registerFormGroup.valid) {
      this.submitInvalidForm.set(false);
      this.authService.register(registerFormGroup)
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
