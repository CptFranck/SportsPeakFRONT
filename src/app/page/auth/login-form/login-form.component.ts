import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertService} from "../../../services/alert/alert.service";
import {AuthService} from "../../../services/auth/auth.service";
import {InputControlComponent} from "../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup | null = null;
  alertService: AlertService = inject(AlertService);
  authService: AuthService = inject(AuthService);
  submitInvalidForm: boolean = false;

  ngOnInit() {
    this.initializeExerciseTypeForm()
  }

  initializeExerciseTypeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(
        // "",
        "admin@sportspeak.com",
        [Validators.required,
          Validators.email]),
      password: new FormControl(
        // "",
        "ChangeMeInProd1!",
        [Validators.required]),
    });
  }

  onSubmitLoginForm() {
    if (!this.loginForm) return
    if (this.loginForm.valid) {
      this.submitInvalidForm = false;
      this.authService.login(this.loginForm)
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
