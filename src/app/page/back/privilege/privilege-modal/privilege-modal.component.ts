import {Component, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {
  PrivilegeDeleteFormComponent
} from "../../../../shared/components/forms/privilege/privilege-delete-form/privilege-delete-form.component";
import {
  PrivilegeDetailDisplayComponent
} from "../../../../shared/components/modal-components/privilege-detail-display/privilege-detail-display.component";
import {
  PrivilegeEntityFormComponent
} from "../../../../shared/components/forms/privilege/privilege-entity-form/privilege-entity-form.component";
import {Privilege} from "../../../../shared/model/dto/privilege";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ActionType} from "../../../../shared/model/enum/action-type";

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
