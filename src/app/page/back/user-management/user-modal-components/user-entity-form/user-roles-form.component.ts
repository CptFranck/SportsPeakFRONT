import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {NgIf} from "@angular/common";
import {InputControlComponent} from "../../../../../components/input-control/input-control.component";
import {User} from "../../../../../interface/dto/user";
import {UserService} from "../../../../../services/user/user.service";
import {Role} from "../../../../../interface/dto/role";
import {RoleSelectorComponent} from "../../../../../components/selectors/role-selector/role-selector.component";
import {UserLoggedService} from "../../../../../services/user-logged/user-logged.service";

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
export class UserRolesFormComponent implements OnInit, AfterViewInit {
  user: User | undefined;
  userForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private userService: UserService = inject(UserService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  @Input() set userInput(value: User | undefined) {
    this.user = value;
    this.initializeUserRoleForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser.subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
    this.initializeUserRoleForm();
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeUserRoleForm() {
    const roleIdsValidator =
      this.isAdmin ? null : Validators.required;
    const userRoleIds: string[] = this.user?.lastName ?
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
