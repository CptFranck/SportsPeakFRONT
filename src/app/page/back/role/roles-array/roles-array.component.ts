import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Role} from "../../../../shared/model/dto/role";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-roles-array',
  imports: [
    ModalButtonComponent,
  ],
  templateUrl: './roles-array.component.html'
})
export class RolesArrayComponent {

  readonly roles = input.required<Role[]>();
  readonly modalId = input.required<string>();

  readonly actionRole = output<FormIndicator>();

  showRoleDetails(muscle: Muscle): void {
    this.actionRole.emit({
      actionType: ActionType.read,
      object: muscle
    });
  }

  modifyRole(role: Role) {
    this.actionRole.emit({
      actionType: ActionType.update,
      object: role
    });
  }

  delRole(role: Role) {
    this.actionRole.emit({
      actionType: ActionType.delete,
      object: role
    });
  }
}
