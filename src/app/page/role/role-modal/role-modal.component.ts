import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../../muscle/muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {
  MuscleEntityFormComponent
} from "../../muscle/muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {
  muscleDeleteFormComponent
} from "../../muscle/muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {ActionType} from "../../../enum/action-type";
import {Role} from "../../../interface/dto/role";
import {RoleDeleteFormComponent} from "../role-modal-components/role-delete-form/role-delete-form.component";
import {
  RoleDetailsDisplayComponent
} from "../role-modal-components/role-details-display/role-details-display.component";
import {RoleEntityFormComponent} from "../role-modal-components/role-entity-form/role-entity-form.component";

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

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.role = value;
    this.action = ActionType.create;
    this.modalTitle = "Add new role";
  }
}
