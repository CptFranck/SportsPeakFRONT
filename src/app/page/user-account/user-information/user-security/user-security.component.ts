import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {User} from "../../../../shared/model/dto/user";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-user-security',
  imports: [
    ModalButtonComponent
  ],
  templateUrl: './user-security.component.html'
})
export class UserSecurityComponent {
  readonly btnClass = "btn btn-secondary"

  readonly user = input.required<User | undefined>();
  readonly modalId = input.required<string>();

  readonly actionUser = output<FormIndicator>();

  onChangePassword() {
    this.actionUser.emit({
      actionType: ActionType.update,
      modificationField: ModificationFieldEnum.password,
      object: this.user()
    });
  }

  onDeleteAccount() {
    this.actionUser.emit({
      actionType: ActionType.delete,
      object: this.user()
    });
  }
}
