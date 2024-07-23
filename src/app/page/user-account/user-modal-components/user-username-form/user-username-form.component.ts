import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../interface/dto/user";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {ActionType} from "../../../../enum/action-type";
import {ModificationField} from "../../../../enum/modification-field";

@Component({
  selector: 'app-user-username-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-username-form.component.html',
})
export class UserUsernameFormComponent implements OnInit, OnDestroy {
  user: User | undefined;
  userForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() modification!: ModificationField;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private userService: UserService = inject(UserService);

  @Input() set userInput(value: User | undefined) {
    this.user = value;
    this.initializeUserUsernameForm();
  }

  ngOnInit() {
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update && this.modification === ModificationField.username)
            this.onSubmit()
        });
    this.initializeUserUsernameForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeUserUsernameForm() {
    this.userForm = new FormGroup({
      newUsername: new FormControl("",
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('([a-zA-Z0-9_]+)[^\\s\\t\\n\\r]{1,}')
        ])
    });

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      this.userService.modifyUserUsername(this.userForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
