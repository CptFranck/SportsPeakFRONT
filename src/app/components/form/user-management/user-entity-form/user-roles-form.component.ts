import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {NgIf} from "@angular/common";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {User} from "../../../../interface/dto/user";
import {UserService} from "../../../../services/user/user.service";
import {RoleSelectorComponent} from "../../../selectors/role-selector/role-selector.component";
import {ActionType} from "../../../../interface/enum/action-type";
import {Role} from "../../../../interface/dto/role";

@Component({
  selector: 'app-user-roles-form',
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    RoleSelectorComponent,
  ],
  templateUrl: './user-roles-form.component.html'
})
export class UserRolesFormComponent implements OnInit, OnDestroy {

  user = input.required<User | undefined>();

  userForm = computed<FormGroup>(() => {
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

  submitInvalidForm = signal<boolean>(false);

  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEvents = input.required<Observable<ActionType> | undefined>();

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
