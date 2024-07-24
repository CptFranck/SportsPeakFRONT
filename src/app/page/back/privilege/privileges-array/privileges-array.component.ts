import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-privileges-array',
  standalone: true,
  imports: [
    ModalButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './privileges-array.component.html',
})
export class PrivilegesArrayComponent {

  @Input() privileges!: Privilege[];
  @Input() modalId!: string;

  @Output() actionPrivilege: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

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
