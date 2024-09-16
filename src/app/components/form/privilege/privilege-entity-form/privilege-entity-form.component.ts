import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {NgIf} from "@angular/common";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {Role} from "../../../../interface/dto/role";
import {RoleSelectorComponent} from "../../../selectors/role-selector/role-selector.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-privilege-entity-form',
  standalone: true,
  imports: [
    InputControlComponent,
    RoleSelectorComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './privilege-entity-form.component.html',
})
export class PrivilegeEntityFormComponent implements OnInit, OnDestroy {

  privilege: Privilege | undefined;
  privilegeForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  isAdmin: boolean = false;

  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private privilegeService: PrivilegeService = inject(PrivilegeService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  @Input() set privilegeInput(value: Privilege | undefined) {
    this.privilege = value;
    this.initializePrivilegeForm();
  }

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin =
        this.userLoggedService.isAdmin());
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.create || actionType === ActionType.update)
            this.onSubmit();
        });
    this.initializePrivilegeForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializePrivilegeForm() {
    const exerciseIdsValidator =
      this.isAdmin ? null : Validators.required;
    const privilegeName: string = this.privilege ? this.privilege.name : "";
    const privilegeRoleIds: number[] = this.privilege?.roles ?
      this.privilege.roles?.map((role: Role) => role.id) : [];

    this.privilegeForm = new FormGroup({
      name: new FormControl(privilegeName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      roleIds: new FormControl(
        privilegeRoleIds, exerciseIdsValidator
      ),
    });

    if (this.privilege)
      this.privilegeForm.addControl("id", new FormControl(this.privilege.id));
  }

  onSubmit() {
    if (!this.privilegeForm) return;
    if (this.privilegeForm.valid) {
      this.submitInvalidForm = false;
      if (!this.privilegeForm.value.id) {
        this.privilegeService.addPrivilege(this.privilegeForm);
      } else {
        this.privilegeService.modifyPrivilege(this.privilegeForm);
      }
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
