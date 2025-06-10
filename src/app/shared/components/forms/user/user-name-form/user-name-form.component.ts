import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {InputControlComponent} from "../../../input-control/input-control.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../../../model/dto/user";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../../core/services/user/user.service";
import {ModificationFieldEnum} from "../../../../model/enum/user-modification-field";
import {ActionType} from "../../../../model/enum/action-type";

@Component({
  selector: 'app-user-name-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-name-form.component.html'
})
export class UserNameFormComponent implements OnInit, OnDestroy {
  submitInvalidForm = signal<boolean>(false);

  readonly user = input.required<User | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly modification = input.required<ModificationFieldEnum>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  readonly userForm = computed<FormGroup>(() => {
    const user = this.user();
    const userFirstName: string = user?.firstName ? user?.firstName : "";
    const userLastName: string = user?.lastName ? user?.lastName : "";

    const userForm: FormGroup = new FormGroup({
      firstName: new FormControl(
        userFirstName,
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)]),
      lastName: new FormControl(
        userLastName,
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)]),
    });

    if (user)
      userForm.addControl("id", new FormControl(user.id));
    return userForm;
  });

  private readonly unsubscribe$ = new Subject<void>();
  private readonly UserService = inject(UserService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification() === ModificationFieldEnum.identity)
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
      this.UserService.modifyUserIdentity(userForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
