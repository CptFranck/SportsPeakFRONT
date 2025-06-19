import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RolesArrayComponent} from "../roles-array/roles-array.component";
import {RoleModalComponent} from "../role-modal/role-modal.component";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {Role} from "../../../../shared/model/dto/role";
import {RoleService} from "../../../../core/services/role/role.service";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {Subject, takeUntil} from "rxjs";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-roles',
  imports: [
    LoadingComponent,
    RolesArrayComponent,
    RoleModalComponent
  ],
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit, OnDestroy {
  role = signal<Role | undefined>(undefined);
  roles = signal<Role[]>([]);
  loading = signal<boolean>(true);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");

  readonly muscleModalId: string = "roleModal";

  private readonly unsubscribe$ = new Subject<void>();
  private readonly roleService = inject(RoleService);

  ngOnInit(): void {
    this.roleService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.roleService.roleList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((roles: Role[]) => this.roles.set(roles));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setRole(formIndicator: FormIndicator) {
    this.role.set(formIndicator.object);
    this.action.set(formIndicator.actionType);
    if (formIndicator.object === undefined)
      this.modalTitle.set("Add new role");
    else
      this.modalTitle.set(formIndicator.object.name);
  }
}
