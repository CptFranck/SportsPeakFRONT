import {Component, input, output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-privileges-array',
  imports: [
    ModalButtonComponent,
    NgForOf,
  ],
  templateUrl: './privileges-array.component.html'
})
export class PrivilegesArrayComponent {

  readonly privileges = input.required<Privilege[]>();
  readonly modalId = input.required<string>();

  readonly actionPrivilege = output<FormIndicator>();

  showPrivilegeDetails(privilege: Privilege): void {
    this.actionPrivilege.emit({
      actionType: ActionType.read,
      object: privilege
    });
  }

  modifyPrivilege(privilege: Privilege) {
    this.actionPrivilege.emit({
      actionType: ActionType.update,
      object: privilege
    });
  }

  delPrivilege(privilege: Privilege) {
    this.actionPrivilege.emit({
      actionType: ActionType.delete,
      object: privilege
    });
  }
}
