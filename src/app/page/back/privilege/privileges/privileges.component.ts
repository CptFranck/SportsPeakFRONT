import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PrivilegesArrayComponent} from "../privileges-array/privileges-array.component";
import {PrivilegeModalComponent} from "../privilege-modal/privilege-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../docs/muscles/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../../docs/muscles/muscles-array/muscles-array.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {ActionType} from "../../../../enum/action-type";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

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
