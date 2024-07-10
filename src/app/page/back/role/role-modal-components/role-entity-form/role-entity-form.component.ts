import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {NgIf} from "@angular/common";
import {Role} from "../../../../../interface/dto/role";
import {RoleService} from "../../../../../services/role/role.service";
import {User} from "../../../../../interface/dto/user";
import {Privilege} from "../../../../../interface/dto/privilege";
import {
  ExerciseSelectorComponent
} from "../../../../../components/selectors/exercise-selector/exercise-selector.component";
import {InputControlComponent} from "../../../../../components/input-control/input-control.component";
import {
  PrivilegeSelectorComponent
} from "../../../../../components/selectors/privilege-selector/privilege-selector.component";
import {UserSelectorComponent} from "../../../../../components/selectors/user-selector/user-selector.component";
import {UserLoggedService} from "../../../../../services/user-logged/user-logged.service";

@Component({
  selector: 'app-role-entity-form',
  standalone: true,
  imports: [
    ExerciseSelectorComponent,
    FormsModule,
    InputControlComponent,
    NgIf,
    ReactiveFormsModule,
    PrivilegeSelectorComponent,
    UserSelectorComponent
  ],
  templateUrl: './role-entity-form.component.html',
})
export class RoleEntityFormComponent implements OnInit, AfterViewInit {

  role: Role | undefined;
  isAdmin: boolean = false;
  roleForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private roleService: RoleService = inject(RoleService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  @Input() set roleInput(value: Role | undefined) {
    this.role = value;
    this.initializeMuscleForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser.subscribe(() => this.isAdmin = this.userLoggedService.isAdmin());
    this.initializeMuscleForm();
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeMuscleForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const roleName: string = this.role ? this.role.name : "";
    const roleUserIds: string[] = this.role?.users ?
      this.role.users?.map((user: User) => user.id) : [];
    const rolePrivilegeIds: string[] = this.role?.privileges ?
      this.role.privileges?.map((privilege: Privilege) => privilege.id) : [];

    this.roleForm = new FormGroup({
      name: new FormControl(roleName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      privilegeIds: new FormControl(
        rolePrivilegeIds, exerciseIdsValidator
      ),
      userIds: new FormControl(
        roleUserIds, exerciseIdsValidator
      ),
    });

    if (this.role)
      this.roleForm.addControl("id", new FormControl(this.role.id));
  }

  onSubmit() {
    if (!this.roleForm) return;
    if (this.roleForm.valid) {
      this.submitInvalidForm = false;
      if (!this.roleForm.value.id) {
        this.roleService.addRole(this.roleForm);
      } else {
        this.roleService.modifyRole(this.roleForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
