import {Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  loading: boolean = true;
  roles: Role[] = [];
  role: Role | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "roleModal";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly roleService: RoleService = inject(RoleService);

  ngOnInit(): void {
    this.roleService.roles
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((roles: Role[]) =>
        this.roles = roles);
    this.roleService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) =>
        this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setRole(formIndicator: FormIndicator) {
    this.role = formIndicator.object;
    this.action = formIndicator.actionType;
    if (formIndicator.object === undefined)
      this.modalTitle = "Add new role";
    else
      this.modalTitle = formIndicator.object.name;
  }
}
