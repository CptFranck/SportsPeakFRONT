import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
  registerFormGroup: FormGroup | null = null;
  alertService: AlertService = inject(AlertService);
  authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.initializeExerciseTypeForm()
  }

  initializeExerciseTypeForm() {
    this.registerFormGroup = new FormGroup({
      firstName: new FormControl("",
        [Validators.required,
          Validators.email]),
      lastName: new FormControl("",
        [Validators.required,
          Validators.email]),
      email: new FormControl("",
        [Validators.required,
          Validators.email]),
      username: new FormControl("",
        [Validators.required,
          Validators.email]),
      password: new FormControl(
        "",
        [Validators.required]),
    });
  }

  onSubmitRegisterForm() {
    if (!this.registerFormGroup) return
    if (this.registerFormGroup.valid) {
      if (!this.registerFormGroup.value.mail) {
        this.authService.register(this.registerFormGroup)
          .subscribe(({data, error}: any) => {
            if (data) {
              // this.router.navigateByUrl('/');
            }
            if (error) {
              this.alertService.createGraphQLErrorAlert(error);
            }
          });
      }
    }
  }
}
