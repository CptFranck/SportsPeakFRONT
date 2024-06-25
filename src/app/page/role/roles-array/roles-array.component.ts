import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";
import {Role} from "../../../interface/dto/role";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {NgForOf, NgIf} from "@angular/common";
import {Muscle} from "../../../interface/dto/muscle";
import {User} from "../../../interface/dto/user";

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
export class RolesArrayComponent implements OnChanges {

  @Input() roles!: Role[];
  @Input() modalId!: string;

  @Output() actionRole: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  roleUsers: { [id: string]: string[] } = {};

  ngOnChanges(): void {
    this.roles.forEach((role: Role) => {
      let userName: string[] = [];
      role.users.forEach((user: User) => {
          userName.push(user.username);
        }
      )
      if (userName.length > 5) {
        userName = userName.slice(0, 4);
        userName.push("and more...");
      }
      this.roleUsers[role.id] = userName;
    })
  }

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
