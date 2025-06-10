import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Role} from "../../../../model/dto/role";
import {RoleService} from "../../../../../core/services/role/role.service";
import {ActionType} from "../../../../model/enum/action-type";

@Component({
  selector: 'app-role-delete-form',
  templateUrl: './role-delete-form.component.html'
})
export class RoleDeleteFormComponent implements OnInit, OnDestroy {

  readonly role = input.required<Role | undefined>();
  readonly btnCloseRef = input.required<HTMLButtonElement>();
  readonly submitEventActionType$ = input.required<Observable<ActionType> | undefined>();

  private readonly unsubscribe$ = new Subject<void>();
  private readonly roleService = inject(RoleService);

  ngOnInit() {
    const submitEventActionType$ = this.submitEventActionType$();
    if (submitEventActionType$)
      submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.delete)
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
