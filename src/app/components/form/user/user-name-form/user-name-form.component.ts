import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {InputControlComponent} from "../../../input-control/input-control.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../../../interface/dto/user";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {NgIf} from "@angular/common";
import {ModificationField} from "../../../../interface/enum/modification-field";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-user-name-form',
  standalone: true,
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-name-form.component.html',
})
export class UserNameFormComponent implements OnInit, OnDestroy {
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
    this.initializeUserNameForm();
  }

  ngOnInit() {
    this.initializeUserNameForm()
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification === ModificationField.name)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeUserNameForm() {
    const userFirstName: string = this.user?.firstName ? this.user?.firstName : "";
    const userLastName: string = this.user?.lastName ? this.user?.lastName : "";
    this.userForm = new FormGroup({
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

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      this.userService.modifyUserIdentity(this.userForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
