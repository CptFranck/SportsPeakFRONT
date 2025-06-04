import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../../../shared/model/dto/user";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {ModificationFieldEnum} from "../../../../shared/model/enum/modification-field.enum";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {UserService} from "../../../../core/services/user/user.service";

@Component({
  selector: 'app-user-email-form',
  imports: [
    InputControlComponent,
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
  readonly submitEventActionType$ = input.required<Observable<ActionTypeEnum> | undefined>();
  readonly modification = input.required<ModificationFieldEnum>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionTypeEnum) => {
          if (actionType === ActionTypeEnum.update && this.modification() === ModificationFieldEnum.email)
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
