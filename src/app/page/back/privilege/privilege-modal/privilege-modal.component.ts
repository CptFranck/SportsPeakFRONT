import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {
  PrivilegeDeleteFormComponent
} from "../../../../components/form/privilege/privilege-delete-form/privilege-delete-form.component";
import {
  PrivilegeDetailDisplayComponent
} from "../../../../components/modal-component/privilege/privilege-detail-display/privilege-detail-display.component";
import {
  PrivilegeEntityFormComponent
} from "../../../../components/form/privilege/privilege-entity-form/privilege-entity-form.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {ActionType} from "../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-privilege-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    PrivilegeDeleteFormComponent,
    PrivilegeDetailDisplayComponent,
    PrivilegeEntityFormComponent
  ],
  templateUrl: './privilege-modal.component.html'
})
export class PrivilegeModalComponent {

  readonly modalTitle = input.required<string>();
  readonly privilegeModalId = input.required<string>();
  readonly privilege = input.required<Privilege | undefined>();
  readonly action = input.required<ActionType>();

  readonly actionPrivilege = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  onClick() {
    this.actionPrivilege.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
