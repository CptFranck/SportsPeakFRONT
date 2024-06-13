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
import {AlertService} from "../../../services/alert/alert.service";
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
  alertService: AlertService = inject(AlertService);
  authService: AuthService = inject(AuthService);

  draft = {
    "firstName": "Admin",
    "lastName": "Admin",
    "username": "Admin",
    "email": "Admin@sportspeak.com",
    "password": "ChangeMeInProd1!",
    "confirmPassword": "ChangeMeInProd1!"
  }

  ngOnInit() {
    this.initializeExerciseTypeForm()
  }

  initializeExerciseTypeForm() {
    this.registerFormGroup = new FormGroup({
        firstName: new FormControl("",
          [Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)]),
        lastName: new FormControl("",
          [Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)]),
        username: new FormControl("",
          [Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)]),
        email: new FormControl("",
          [Validators.required,
            Validators.email]),
        password: new FormControl("",
          [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
            Validators.pattern('^(?=.*\\d)(?=.*[a-z]+)(?=.*[A-Z]+)[^\\s\\t\\n\\r]{10,}$')
          ]),
        confirmPassword: new FormControl(
          "",
          [Validators.required],
        ),
      },
      {
        validators: this.confirmValidator('password', 'confirmPassword')
      });
  }

  confirmValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = {confirmedValidator: 'Passwords do not match'};
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
        .subscribe(({data, error}: any) => {
          if (data) {
            // this.router.navigateByUrl('/');
          }
          if (error) {
            this.alertService.createGraphQLErrorAlert(error);
          }
        });
    } else {
      this.submitInvalidForm = true;
    }
  }
}
