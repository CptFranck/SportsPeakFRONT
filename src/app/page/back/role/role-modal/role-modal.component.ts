import {Component, EventEmitter, input, Output, TemplateRef, ViewChild} from '@angular/core';
import {RoleDeleteFormComponent} from "../../../../components/form/role/role-delete-form/role-delete-form.component";
import {
  RoleDetailsDisplayComponent
} from "../../../../components/modal-component/role/role-details-display/role-details-display.component";
import {RoleEntityFormComponent} from "../../../../components/form/role/role-entity-form/role-entity-form.component";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {Role} from "../../../../interface/dto/role";
import {ActionType} from "../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-role-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    NgIf,
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

  @Output() roleAction: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick() {
    this.roleAction.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
