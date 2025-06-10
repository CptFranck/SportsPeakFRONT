import {Component, input, output} from '@angular/core';
import {
  RoleDeleteFormComponent
} from "../../../../shared/components/forms/role/role-delete-form/role-delete-form.component";
import {
  RoleDetailsDisplayComponent
} from "../../../../shared/components/modal-components/role-details-display/role-details-display.component";
import {
  RoleEntityFormComponent
} from "../../../../shared/components/forms/role/role-entity-form/role-entity-form.component";
import {ModalButtonComponent} from "../../../../shared/components/modal-button/modal-button.component";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {Role} from "../../../../shared/model/dto/role";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-role-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    RoleDeleteFormComponent,
    RoleDetailsDisplayComponent,
    RoleEntityFormComponent
  ],
  templateUrl: './role-modal.component.html'
})
export class RoleModalComponent {
  readonly modalTitle = input.required<string>();
  readonly roleModalId = input.required<string>();
  readonly role = input.required<Role | undefined>();
  readonly action = input.required<ActionType>();

  readonly actionRole = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  onClick() {
    this.actionRole.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
