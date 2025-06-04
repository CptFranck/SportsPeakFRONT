import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Role} from "../../../../shared/model/dto/role";
import {RoleService} from "../../../../core/services/role/role.service";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-role-delete-form',
  templateUrl: './role-delete-form.component.html'
})
export class RoleDeleteFormComponent implements OnInit, OnDestroy {

  readonly role = input.required<Role | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionEnum> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly roleService = inject(RoleService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionEnum) => {
          if (actionType === ActionEnum.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.next();
  }

  onSubmit() {
    const role = this.role();
    if (!role) return;
    this.roleService.deleteRole(role);
    this.btnCloseRef().click();
  }
}
