import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {User} from "../../../../interface/dto/user";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-users-array',
  imports: [
    ModalButtonComponent,
  ],
  templateUrl: './users-management-array.component.html'
})
export class UsersManagementArrayComponent {
  readonly users = input.required<User[]>();
  readonly modalId = input.required<string>();

  readonly actionUser = output<FormIndicator>();

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
