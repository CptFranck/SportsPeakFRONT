import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../../../interface/dto/user";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {NgIf} from "@angular/common";
import {UserService} from "../../../../services/user/user.service";
import {ModificationField} from "../../../../interface/enum/modification-field";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-user-email-form',
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './user-email-form.component.html'
})
export class UserEmailFormComponent implements OnInit, OnDestroy {
  readonly user = input.required<User | undefined>();

  readonly userForm = computed<FormGroup>(() => {
    const userForm: FormGroup = new FormGroup({
      newEmail: new FormControl("",
        [Validators.required,
          Validators.email]),
      password: new FormControl(
        "",
        [Validators.required],
      ),
    });

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
          if (actionType === ActionType.update && this.modification() === ModificationField.email)
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
      this.userService.modifyUserEmail(userForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
