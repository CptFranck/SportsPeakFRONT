import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../interface/dto/user";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {ModificationField} from "../../../../interface/enum/modification-field";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";

@Component({
  selector: 'app-user-information-display',
  standalone: true,
  imports: [
    ModalButtonComponent
  ],
  templateUrl: './user-information-display.component.html',
})
export class UserInformationDisplayComponent {

  btnClass: string = "btn btn-secondary"

  @Input() user!: User | undefined;
  @Input() modalId!: string;

  @Output() userAction: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  onChangeEmail() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.email,
      object: this.user
    });
  }

  onChangeUsername() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.username,
      object: this.user
    });
  }

  onChangeName() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.name,
      object: this.user
    });
  }
}
