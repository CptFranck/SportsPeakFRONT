import {Component, computed, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {InputControlComponent} from "../../../input-control/input-control.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {Role} from "../../../../interface/dto/role";
import {RoleSelectorComponent} from "../../../selectors/role-selector/role-selector.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-privilege-entity-form',
  imports: [
    InputControlComponent,
    RoleSelectorComponent,
    ReactiveFormsModule
  ],
  templateUrl: './privilege-entity-form.component.html'
})
export class PrivilegeEntityFormComponent implements OnInit, OnDestroy {

  readonly privilege = input.required<Privilege | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  submitInvalidForm = signal<boolean>(false);

  private isAdmin = false;

  readonly privilegeForm = computed<FormGroup>(() => {
    const exerciseIdsValidator = this.isAdmin ? null : Validators.required;

    const privilege = this.privilege();
    const privilegeName: string = privilege ? privilege.name : "";
    const privilegeRoleIds: number[] = privilege?.roles ? privilege.roles?.map((role: Role) => role.id) : [];

    const privilegeForm: FormGroup = new FormGroup({
      name: new FormControl(privilegeName,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]),
      roleIds: new FormControl(
        privilegeRoleIds, exerciseIdsValidator
      ),
    });

    if (privilege)
      privilegeForm.addControl("id", new FormControl(privilege.id));
    return privilegeForm;
  });
  
  private readonly unsubscribe$ = new Subject<void>();
  private readonly privilegeService = inject(PrivilegeService);
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin =
        this.userLoggedService.isAdmin());
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.create || actionType === ActionType.update)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const privilegeForm = this.privilegeForm()
    if (privilegeForm.valid) {
      this.submitInvalidForm.set(false);
      if (!privilegeForm.value.id) {
        this.privilegeService.addPrivilege(privilegeForm);
      } else {
        this.privilegeService.modifyPrivilege(privilegeForm);
      }
      this.btnCloseRef().click();
    } else {
      this.submitInvalidForm.set(true);
    }
  }
}
