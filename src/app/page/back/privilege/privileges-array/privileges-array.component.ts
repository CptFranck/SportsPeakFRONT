import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Privilege} from "../../../../shared/model/dto/privilege";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-privileges-array',
  imports: [
    ModalButtonComponent,
  ],
  templateUrl: './privileges-array.component.html'
})
export class PrivilegesArrayComponent {

  readonly privileges = input.required<Privilege[]>();
  readonly modalId = input.required<string>();

  readonly actionPrivilege = output<FormIndicator>();

  showPrivilegeDetails(privilege: Privilege): void {
    this.actionPrivilege.emit({
      actionType: ActionEnum.read,
      object: privilege
    });
  }

  modifyPrivilege(privilege: Privilege) {
    this.actionPrivilege.emit({
      actionType: ActionEnum.update,
      object: privilege
    });
  }

  delPrivilege(privilege: Privilege) {
    this.actionPrivilege.emit({
      actionType: ActionEnum.delete,
      object: privilege
    });
  }
}
