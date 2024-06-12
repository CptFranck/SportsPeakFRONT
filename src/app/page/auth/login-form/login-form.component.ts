import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../services/alert/alert.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup | null = null;
  alertService: AlertService = inject(AlertService);
  authService: AuthService = inject(AuthService);
  router: Router = new Router();

  ngOnInit() {
    this.initializeExerciseTypeForm()
  }

  initializeExerciseTypeForm() {
    this.loginForm = new FormGroup({
      mail: new FormControl("",
        [Validators.required,
          Validators.email]),
      password: new FormControl(
        "",
        [Validators.required]),
    });
  }

  onSubmitLoginForm() {
    if (!this.loginForm) return
    if (this.loginForm.valid) {
      if (!this.loginForm.value.mail) {
        this.authService.login(this.loginForm)
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
