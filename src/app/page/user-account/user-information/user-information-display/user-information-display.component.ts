import {Component, EventEmitter, input, Output} from '@angular/core';
import {User} from "../../../../interface/dto/user";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {ModificationField} from "../../../../interface/enum/modification-field";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";

@Component({
  selector: 'app-user-information-display',
  imports: [
    ModalButtonComponent
  ],
  templateUrl: './user-information-display.component.html'
})
export class UserInformationDisplayComponent {

  btnClass = "btn btn-secondary"

  readonly user = input.required<User | undefined>();
  readonly modalId = input.required<string>();

  @Output() userAction = new EventEmitter<FormIndicator>();

  onChangeEmail() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.email,
      object: this.user()
    });
  }

  onChangeUsername() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.username,
      object: this.user()
    });
  }

  onChangeName() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.name,
      object: this.user()
    });
  }
}
