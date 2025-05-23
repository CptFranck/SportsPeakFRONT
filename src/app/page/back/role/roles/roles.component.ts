import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RolesArrayComponent} from "../roles-array/roles-array.component";
import {RoleModalComponent} from "../role-modal/role-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {Role} from "../../../../interface/dto/role";
import {ActionType} from "../../../../interface/enum/action-type";
import {RoleService} from "../../../../services/role/role.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {Subject, takeUntil} from "rxjs";

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
  loading = signal<boolean>(true);
  roles: Role[] = [];
  role = signal<Role | undefined>(undefined);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");

  readonly muscleModalId: string = "roleModal";

  private readonly unsubscribe$ = new Subject<void>();
  private readonly roleService = inject(RoleService);

  ngOnInit(): void {
    this.roleService.roles
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((roles: Role[]) => this.roles = roles);
    this.roleService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
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
