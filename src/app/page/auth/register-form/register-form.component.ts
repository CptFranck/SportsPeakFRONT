import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {InputControlComponent} from "../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  submitInvalidForm: boolean = false;
  registerFormGroup: FormGroup | null = null;
  draft = {
    "firstName": "Admin",
    "lastName": "Admin",
    "username": "admin",
    "email": "admin@sportspeak.com",
    "password": "ChangeMeInProd1!",
    "confirmPassword": "ChangeMeInProd1!"
  }
  private authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.initializeExerciseTypeForm();
  }

  initializeExerciseTypeForm() {
    this.registerFormGroup = new FormGroup({
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
        validators: this.confirmValidator('password', 'confirmPassword')
      });
  }

  confirmValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const control: AbstractControl | null = abstractControl.get(controlName);
      const matchingControl: AbstractControl | null = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error: ValidationErrors = {confirmedValidator: 'Passwords do not match'};
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    }
  }

  onSubmitRegisterForm() {
    if (!this.registerFormGroup) return
    if (this.registerFormGroup.valid) {
      this.submitInvalidForm = false;
      this.authService.register(this.registerFormGroup)
    } else {
      this.submitInvalidForm = true;
    }
  }
}
