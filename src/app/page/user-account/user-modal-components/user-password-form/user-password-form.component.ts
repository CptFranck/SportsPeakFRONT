import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../interface/dto/user";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {confirmValidator} from "../../../../validators/confirmValidator";
import {ModificationField} from "../../../../enum/modification-field";
import {ActionType} from "../../../../enum/action-type";

@Component({
  selector: 'app-user-password-form',
  standalone: true,
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-password-form.component.html',
})
export class UserPasswordFormComponent implements OnInit, OnDestroy {
  user: User | undefined;
  userForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;
  @Input() modification!: ModificationField;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private userService: UserService = inject(UserService);

  @Input() set userInput(value: User | undefined) {
    this.user = value;
    this.initializeUserPasswordForm();
  }

  ngOnInit() {
    this.initializeUserPasswordForm()
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification === ModificationField.password)
            this.onSubmit()
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeUserPasswordForm() {
    this.userForm = new FormGroup({
        oldPassword: new FormControl(
          "",
          [Validators.required
          ]),
        newPassword: new FormControl(
          "",
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
        validators: confirmValidator('newPassword', 'confirmPassword')
      }
    );

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      this.userService.modifyUserPassword(this.userForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
