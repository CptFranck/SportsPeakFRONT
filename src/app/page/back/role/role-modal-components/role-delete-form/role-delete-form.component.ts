import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Role} from "../../../../../interface/dto/role";
import {RoleService} from "../../../../../services/role/role.service";
import {ActionType} from "../../../../../enum/action-type";

@Component({
  selector: 'app-role-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './role-delete-form.component.html',
})
export class RoleDeleteFormComponent implements OnInit, OnDestroy {

  @Input() role!: Role | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private roleService: RoleService = inject(RoleService);

  ngOnInit() {
    if (this.submitEventActionType$)
      this.submitEventActionType$
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
    if (!this.role) return;
    this.roleService.deleteRole(this.role);
    this.btnCloseRef.click();
  }
}
