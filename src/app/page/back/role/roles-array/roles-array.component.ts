import {Component, input, output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Role} from "../../../../interface/dto/role";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {Muscle} from "../../../../interface/dto/muscle";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-roles-array',
  imports: [
    ModalButtonComponent,
    NgForOf
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
