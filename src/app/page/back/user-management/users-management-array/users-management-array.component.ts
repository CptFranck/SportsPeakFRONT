import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {User} from "../../../../interface/dto/user";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-users-array',
  imports: [
    ModalButtonComponent,
    NgForOf
  ],
  templateUrl: './users-management-array.component.html'
})
export class UsersManagementArrayComponent {
  @Input() users!: User[];
  @Input() modalId!: string;

  @Output() actionUser: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  showUserDetails(user: User): void {
    this.actionUser.emit({
      actionType: ActionType.read,
      object: user
    });
  }

  modifyUser(user: User) {
    this.actionUser.emit({
      actionType: ActionType.update,
      object: user
    });
  }
}
