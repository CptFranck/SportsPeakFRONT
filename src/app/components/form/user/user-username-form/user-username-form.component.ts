import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {NgIf} from "@angular/common";
import {ActionType} from "../../../../interface/enum/action-type";
import {ModificationField} from "../../../../interface/enum/modification-field";
import {User} from "../../../../interface/dto/user";

@Component({
  selector: 'app-user-username-form',
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-username-form.component.html'
})
export class UserUsernameFormComponent implements OnInit, OnDestroy {
  readonly userInput = input.required<User | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly modification = input.required<ModificationField>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  userForm = computed<FormGroup | null>(() => {
    const userForm: FormGroup = new FormGroup({
      newUsername: new FormControl("",
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('([a-zA-Z0-9_]+)[^\\s\\t\\n\\r]{1,}')
        ])
    });
    const user = this.userInput();
    if (user && userForm) {
      userForm.addControl("id", new FormControl(user.id));
    }
    return userForm;
  });

  submitInvalidForm = signal<boolean>(false);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification() === ModificationField.username)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const userForm = this.userForm();
    if (!userForm) return;
    if (userForm.valid) {
      this.submitInvalidForm.set(false);
      this.userService.modifyUserUsername(userForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
