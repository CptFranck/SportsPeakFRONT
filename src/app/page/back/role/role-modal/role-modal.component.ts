import {Component, input, output} from '@angular/core';
import {RoleDeleteFormComponent} from "../../../../components/form/role/role-delete-form/role-delete-form.component";
import {
  RoleDetailsDisplayComponent
} from "../../../../components/modal-component/role/role-details-display/role-details-display.component";
import {RoleEntityFormComponent} from "../../../../components/form/role/role-entity-form/role-entity-form.component";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {Role} from "../../../../shared/model/dto/role";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";

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
  readonly action = input.required<ActionTypeEnum>();

  readonly actionRole = output<FormIndicator>();

  protected readonly ActionType = ActionTypeEnum;

  onClick() {
    this.actionRole.emit({
      object: undefined,
      actionType: ActionTypeEnum.create
    })
  }
}
