import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RolesArrayComponent} from "../roles-array/roles-array.component";
import {RoleModalComponent} from "../role-modal/role-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../muscle/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../../muscle/muscles-array/muscles-array.component";
import {Role} from "../../../../interface/dto/role";
import {ActionType} from "../../../../enum/action-type";
import {RoleService} from "../../../../services/role/role.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    LoadingComponent,
    MuscleModalComponent,
    MusclesArrayComponent,
    RolesArrayComponent,
    RoleModalComponent
  ],
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  loading: boolean = true;
  roles: Role[] = [];
  role: Role | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "roleModal";
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private roleService: RoleService = inject(RoleService);

  ngOnInit(): void {
    this.roleService.roles.subscribe((roles: Role[]) => this.roles = roles);
    this.roleService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  setRole(formIndicator: FormIndicator) {
    this.role = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.name;
  }

}
