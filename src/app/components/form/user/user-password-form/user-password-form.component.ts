import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {User} from "../../../../interface/dto/user";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {ModificationField} from "../../../../interface/enum/modification-field";
import {ActionType} from "../../../../interface/enum/action-type";
import {confirmValidator} from "../../../../validators/confirmValidator";

@Component({
  selector: 'app-user-password-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-password-form.component.html'
})
export class UserPasswordFormComponent implements OnInit, OnDestroy {
  readonly user = input.required<User | undefined>();

  readonly userForm = computed<FormGroup>(() => {
    const userForm: FormGroup = new FormGroup({
        oldPassword: new FormControl(
          "",
          [Validators.required],
        ),
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
    const user = this.user();
    if (user)
      userForm.addControl("id", new FormControl(user.id));
    return userForm;
  });

  submitInvalidForm = signal<boolean>(false);

  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();
  readonly modification = input.required<ModificationField>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification() === ModificationField.password)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const userForm = this.userForm();
    if (userForm.valid) {
      this.submitInvalidForm.set(false);
      this.userService.modifyUserPassword(userForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
