import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {RoleService} from "../../../../../core/services/role/role.service";
import {Privilege} from "../../../../model/dto/privilege";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {
  PrivilegeSelectorComponent
} from "../../../multi-select-components/privilege-selector/privilege-selector.component";
import {CurrentUserService} from "../../../../../core/services/current-user/current-user.service";
import {Role} from "../../../../model/dto/role";
import {ActionType} from "../../../../model/enum/action-type";

@Component({
  selector: 'app-role-entity-form',
  imports: [
    FormsModule,
    InputControlComponent,
    ReactiveFormsModule,
    PrivilegeSelectorComponent,
  ],
  templateUrl: './role-entity-form.component.html'
})
export class RoleEntityFormComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  readonly role = input.required<Role | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  roleForm = computed<FormGroup>(() => {
    const exerciseIdsValidator = this.isAdmin ? null : Validators.required;

    const role = this.role()
    const roleName: string = role ? role.name : "";
    const rolePrivilegeIds: number[] = role?.privileges ? role.privileges?.map((privilege: Privilege) => privilege.id) : [];

    const roleForm: FormGroup = new FormGroup({
      name: new FormControl(roleName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      privilegeIds: new FormControl(
        rolePrivilegeIds, exerciseIdsValidator
      ),
    });

    if (role)
      roleForm.addControl("id", new FormControl(role.id));

    return roleForm;
  });

  submitInvalidForm = signal<boolean>(false);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly roleService = inject(RoleService);
  private readonly currentUserService = inject(CurrentUserService);

  ngOnInit() {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin = this.currentUserService.isAdmin());
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          (actionType === ActionType.create || actionType === ActionType.update) && this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const roleForm = this.roleForm()
    if (roleForm.valid) {
      this.submitInvalidForm.set(false);
      if (!roleForm.value.id) {
        this.roleService.addRole(roleForm);
      } else {
        this.roleService.modifyRole(roleForm);
      }
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
