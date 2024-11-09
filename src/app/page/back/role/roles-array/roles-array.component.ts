import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Role} from "../../../../interface/dto/role";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {Muscle} from "../../../../interface/dto/muscle";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-roles-array',
  standalone: true,
  imports: [
    ModalButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './roles-array.component.html',
})
export class RolesArrayComponent {

  @Input() roles!: Role[];
  @Input() modalId!: string;

  @Output() actionRole: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

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
