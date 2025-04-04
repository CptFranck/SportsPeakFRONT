import {Component, EventEmitter, input, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalButtonComponent} from "../../../../components/modal/modal-button/modal-button.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
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

@Component({
  selector: 'app-privilege-modal',
  imports: [
    ModalButtonComponent,
    ModalComponent,
    NgIf,
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

  @Output() privilegeAction = new EventEmitter();

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;

  onClick() {
    this.privilegeAction.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
