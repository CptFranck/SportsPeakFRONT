import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {User} from "../../../../interface/dto/user";
import {UserService} from "../../../../services/user/user.service";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {Role} from "../../../../interface/dto/role";

@Component({
  selector: 'app-user-entity-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-entity-form.component.html',
})
export class UserEntityFormComponent implements OnInit, AfterViewInit {
  user: User | undefined;
  userForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private userService: UserService = inject(UserService);

  @Input() set userInput(value: User | undefined) {
    this.user = value;
    this.initializeMuscleForm();
  }

  ngOnInit() {
    this.initializeMuscleForm()
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeMuscleForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const userFirstname: string = this.user ? this.user.firstName : "";
    const userLastname: string = this.user ? this.user.firstName : "";
    const userEmail: string = this.user ? this.user.email : "";
    const userUsername: string = this.user ? this.user.username : "";
    const userRole: string[] = this.user?.lastName ?
      this.user.roles?.map((role: Role) => role.id) : [];
    const password: string = "";

    this.userForm = new FormGroup({
        firstName: new FormControl(
          userFirstname,
          [Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)]),
        lastName: new FormControl(
          userLastname,
          [Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50)]),
        username: new FormControl(
          userUsername,
          [Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50),
            Validators.pattern('([a-zA-Z0-9_]+)[^\\s\\t\\n\\r]{1,}')]),
        email: new FormControl(
          userEmail,
          [Validators.required,
            Validators.email]),
        password: new FormControl(
          password,
          [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
            Validators.pattern('^(?=.*\\d)(?=.*[a-z]+)(?=.*[A-Z]+)[^\\s\\t\\n\\r]{10,}$')
          ]),
        confirmPassword: new FormControl(
          [Validators.required],
        ),
      },
      {
        validators: this.confirmValidator('password', 'confirmPassword')
      });

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
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

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      if (!this.userForm.value.id) {
        this.userService.addUser(this.userForm);
      } else {
        this.userService.modifyUser(this.userForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
