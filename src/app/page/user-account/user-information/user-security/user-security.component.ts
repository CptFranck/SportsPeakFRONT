import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {User} from "../../../../shared/model/dto/user";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field.enum";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

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
      actionType: ActionEnum.update,
      modificationField: ModificationFieldEnum.password,
      object: this.user()
    });
  }

  onDeleteAccount() {
    this.actionUser.emit({
      actionType: ActionEnum.delete,
      object: this.user()
    });
  }
}
