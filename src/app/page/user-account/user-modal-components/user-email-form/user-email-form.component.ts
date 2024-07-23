import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../../../interface/dto/user";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {UserService} from "../../../../services/user/user.service";
import {
  PrivilegeSelectorComponent
} from "../../../../components/selectors/privilege-selector/privilege-selector.component";
import {UserSelectorComponent} from "../../../../components/selectors/user-selector/user-selector.component";
import {ModificationField} from "../../../../enum/modification-field";
import {ActionType} from "../../../../enum/action-type";

@Component({
  selector: 'app-user-email-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    PrivilegeSelectorComponent,
    ReactiveFormsModule,
    UserSelectorComponent
  ],
  templateUrl: './user-email-form.component.html',
})
export class UserEmailFormComponent implements OnInit, OnDestroy {
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
    this.initializeUserEmailForm();
  }

  ngOnInit() {
    this.initializeUserEmailForm()
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification === ModificationField.email)
            this.onSubmit()
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeUserEmailForm() {
    this.userForm = new FormGroup({
      newEmail: new FormControl("",
        [Validators.required,
          Validators.email]),
      password: new FormControl(
        "",
        [Validators.required],
      ),
    });

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      this.userService.modifyUserEmail(this.userForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
