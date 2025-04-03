import {Component, EventEmitter, Output, input} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {User} from "../../../../interface/dto/user";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {ModificationField} from "../../../../interface/enum/modification-field";

@Component({
    selector: 'app-user-security',
    imports: [
        ModalButtonComponent
    ],
    templateUrl: './user-security.component.html'
})
export class UserSecurityComponent {
  btnClass: string = "btn btn-secondary"

  readonly user = input.required<User | undefined>();
  readonly modalId = input.required<string>();

  @Output() userAction: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  onChangePassword() {
    this.userAction.emit({
      actionType: ActionType.update,
      modificationField: ModificationField.password,
      object: this.user()
    });
  }

  onDeleteAccount() {
    this.userAction.emit({
      actionType: ActionType.delete,
      object: this.user()
    });
  }
}
