import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {User} from "../../../../model/dto/user";
import {UserService} from "../../../../../core/services/user/user.service";
import {RoleSelectorComponent} from "../../../multi-select-components/role-selector/role-selector.component";
import {Role} from "../../../../model/dto/role";
import {ActionType} from "../../../../model/enum/action-type";

@Component({
  selector: 'app-user-roles-form',
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    RoleSelectorComponent,
  ],
  templateUrl: './user-roles-form.component.html'
})
export class UserRolesFormComponent implements OnInit, OnDestroy {
  submitInvalidForm = signal<boolean>(false);

  readonly user = input.required<User | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEvents = input.required<Observable<ActionType> | undefined>();

  readonly userForm = computed<FormGroup>(() => {
    const user = this.user();
    const userRoleIds: number[] = user?.lastName ?
      user?.roles?.map((role: Role) => role.id) : [];

    const userForm: FormGroup = new FormGroup({
      roleIds: new FormControl(
        userRoleIds, Validators.required
      )
    });
    if (user)
      userForm.addControl("id", new FormControl(user.id));
    return userForm;
  })

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit() {
    const submitEvents = this.submitEvents();
    if (submitEvents)
      submitEvents
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.update)
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
      this.userService.modifyUserRoles(userForm);
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
