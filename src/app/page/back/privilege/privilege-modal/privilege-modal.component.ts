import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {
  MuscleDetailsDisplayComponent
} from "../../../muscle/muscle-modal-components/muscle-details-display/muscle-details-display.component";
import {
  MuscleEntityFormComponent
} from "../../../muscle/muscle-modal-components/muscle-entity-form/muscle-entity-form.component";
import {NgIf} from "@angular/common";
import {
  muscleDeleteFormComponent
} from "../../../muscle/muscle-modal-components/muscle-delete-form/muscle-delete-form.component";
import {
  PrivilegeDeleteFormsComponent
} from "../privilege-modal-components/privilege-delete-forms/privilege-delete-forms.component";
import {
  PrivilegeDetailDisplayComponent
} from "../privilege-modal-components/privilege-detail-display/privilege-detail-display.component";
import {
  PrivilegeEntityFormComponent
} from "../privilege-modal-components/privilege-entity-form/privilege-entity-form.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {ActionType} from "../../../../enum/action-type";

@Component({
  selector: 'app-privilege-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    PrivilegeDeleteFormsComponent,
    PrivilegeDetailDisplayComponent,
    PrivilegeEntityFormComponent
  ],
  templateUrl: './privilege-modal.component.html',
})
export class PrivilegeModalComponent {
  @Input() modalTitle!: string;
  @Input() privilegeModalId!: string;
  @Input() privilege: Privilege | undefined;
  @Input() action!: ActionType;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick(value: undefined) {
    this.privilege = value;
    this.action = ActionType.create;
    this.modalTitle = "Add new muscle";
  }
}
