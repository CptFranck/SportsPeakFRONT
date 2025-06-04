import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {User} from "../../../../shared/model/dto/user";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

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
      actionType: ActionEnum.read,
      object: user
    });
  }

  modifyUser(user: User) {
    this.actionUser.emit({
      actionType: ActionEnum.update,
      object: user
    });
  }
}
