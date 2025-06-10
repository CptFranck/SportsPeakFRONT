import {Component, input, output} from '@angular/core';
import {User} from "../../../../shared/model/dto/user";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-user-information-display',
  imports: [
    ModalButtonComponent
  ],
  templateUrl: './user-information-display.component.html'
})
export class UserInformationDisplayComponent {

  readonly btnClass = "btn btn-secondary";

  readonly user = input.required<User | undefined>();
  readonly modalId = input.required<string>();

  readonly actionUser = output<FormIndicator>();

  onChangeEmail() {
    this.actionUser.emit({
      actionType: ActionType.update,
      modificationField: ModificationFieldEnum.email,
      object: this.user()
    });
  }

  onChangeUsername() {
    this.actionUser.emit({
      actionType: ActionType.update,
      modificationField: ModificationFieldEnum.username,
      object: this.user()
    });
  }

  onChangeName() {
    this.actionUser.emit({
      actionType: ActionType.update,
      modificationField: ModificationFieldEnum.identity,
      object: this.user()
    });
  }
}
