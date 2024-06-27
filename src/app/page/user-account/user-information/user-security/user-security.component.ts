import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {User} from "../../../../interface/dto/user";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../enum/action-type";
import {ModificationField} from "../../../../enum/modification-field";

@Component({
  selector: 'app-user-security',
  standalone: true,
  imports: [
    ModalButtonComponent
  ],
  templateUrl: './user-security.component.html',
})
export class UserSecurityComponent {
  btnClass: string = "btn btn-secondary"

  @Input() user!: User | undefined;
  @Input() modalId!: string;

  @Output() userAction: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  onChangePassword() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.password,
      object: this.user
    });
  }

  onDeleteAccount() {
    this.userAction.emit({
      actionType: ActionType.delete,
      object: this.user
    });
  }
}
