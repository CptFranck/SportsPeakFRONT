import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {NgIf} from "@angular/common";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {User} from "../../../../interface/dto/user";
import {UserService} from "../../../../services/user/user.service";
import {Role} from "../../../../interface/dto/role";
import {RoleSelectorComponent} from "../../../selectors/role-selector/role-selector.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-user-roles-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    RoleSelectorComponent,
  ],
  templateUrl: './user-roles-form.component.html',
})
export class UserRolesFormComponent implements OnInit, OnDestroy {
  user: User | undefined;
  isAdmin: boolean = false;
  userForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<ActionType> | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userService: UserService = inject(UserService);
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);

  @Input() set userInput(value: User | undefined) {
    this.user = value;
    this.initializeUserRoleForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() =>
        this.isAdmin = this.userLoggedService.isAdmin());
    if (this.submitEvents)
      this.submitEvents
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update)
            this.onSubmit();
        });
    this.initializeUserRoleForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeUserRoleForm() {
    const roleIdsValidator =
      this.isAdmin ? null : Validators.required;
    const userRoleIds: number[] = this.user?.lastName ?
      this.user.roles?.map((role: Role) => role.id) : [];

    this.userForm = new FormGroup({
      roleIds: new FormControl(
        userRoleIds, roleIdsValidator
      )
    });

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      this.userService.modifyUserRoles(this.userForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
