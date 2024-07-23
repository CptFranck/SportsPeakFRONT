import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {RoleDeleteFormComponent} from "../role-modal-components/role-delete-form/role-delete-form.component";
import {
  RoleDetailsDisplayComponent
} from "../role-modal-components/role-details-display/role-details-display.component";
import {RoleEntityFormComponent} from "../role-modal-components/role-entity-form/role-entity-form.component";
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../../../docs/muscles/muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {
  MuscleEntityFormComponent
} from "../../../docs/muscles/muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {
  muscleDeleteFormComponent
} from "../../../docs/muscles/muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {Role} from "../../../../interface/dto/role";
import {ActionType} from "../../../../enum/action-type";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-role-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    RoleDeleteFormComponent,
    RoleDetailsDisplayComponent,
    RoleEntityFormComponent
  ],
  templateUrl: './role-modal.component.html',
})
export class RoleModalComponent {
  @Input() modalTitle!: string;
  @Input() roleModalId!: string;
  @Input() role: Role | undefined;
  @Input() action!: ActionType;

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
