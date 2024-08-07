import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
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
import {
  PrivilegeDeleteFormComponent
} from "../privilege-modal-components/privilege-delete-form/privilege-delete-form.component";
import {
  PrivilegeDetailDisplayComponent
} from "../privilege-modal-components/privilege-detail-display/privilege-detail-display.component";
import {
  PrivilegeEntityFormComponent
} from "../privilege-modal-components/privilege-entity-form/privilege-entity-form.component";
import {Privilege} from "../../../../interface/dto/privilege";
import {ActionType} from "../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

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
    PrivilegeDeleteFormComponent,
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

  @Output() privilegeAction: EventEmitter<FormIndicator> = new EventEmitter();

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick() {
    this.privilegeAction.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
