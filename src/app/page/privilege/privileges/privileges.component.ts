import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActionType} from "../../../enum/action-type";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {Privilege} from "../../../interface/dto/privilege";
import {PrivilegeService} from "../../../services/privilege/privilege.service";
import {LoadingComponent} from "../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../muscle/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../muscle/muscles-array/muscles-array.component";
import {PrivilegesArrayComponent} from "../privileges-array/privileges-array.component";
import {PrivilegeModalComponent} from "../privilege-modal/privilege-modal.component";

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [
    LoadingComponent,
    MuscleModalComponent,
    MusclesArrayComponent,
    PrivilegesArrayComponent,
    PrivilegeModalComponent
  ],
  templateUrl: './privileges.component.html',
})
export class PrivilegesComponent implements OnInit {
  loading: boolean = true;
  privileges: Privilege[] = [];
  privilege: Privilege | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  privilegeModalId: string = "privilegeModal";
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private privilegeService: PrivilegeService = inject(PrivilegeService);

  ngOnInit(): void {
    this.privilegeService.privileges.subscribe((privileges: Privilege[]) => this.privileges = privileges);
    this.privilegeService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  setPrivilege(formIndicator: FormIndicator) {
    this.privilege = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.name;
  }
}
