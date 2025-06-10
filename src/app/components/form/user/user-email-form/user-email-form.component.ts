import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../../../shared/model/dto/user";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {UserService} from "../../../../core/services/user/user.service";
import {ActionType} from "../../../../shared/model/enum/action-type";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field";

@Component({
  selector: 'app-user-email-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-email-form.component.html'
})
export class UserEmailFormComponent implements OnInit, OnDestroy {
  submitInvalidForm = signal<boolean>(false);

  readonly user = input.required<User | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly modification = input.required<ModificationFieldEnum>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

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

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification() === ModificationFieldEnum.email)
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
