import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {InputControlComponent} from "../../../input-control/input-control.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../../../shared/model/dto/user";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../core/services/user/user.service";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field.enum";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-user-name-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-name-form.component.html'
})
export class UserNameFormComponent implements OnInit, OnDestroy {
  readonly user = input.required<User | undefined>();

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

  submitInvalidForm = signal<boolean>(false);

  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionEnum> | undefined>();
  readonly modification = input.required<ModificationFieldEnum>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly UserService = inject(UserService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionEnum) => {
          if (actionType === ActionEnum.update && this.modification() === ModificationFieldEnum.identity)
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
