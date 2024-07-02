import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {
  UserDetailsDisplayComponent
} from "../user-modal-components/user-details-display/user-details-display.component";
import {UserRolesFormComponent} from "../user-modal-components/user-entity-form/user-roles-form.component";
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
  UserDeleteFormComponent
} from "../../../user-account/user-modal-components/user-delete-form/user-delete-form.component";
import {User} from "../../../../interface/dto/user";
import {ActionType} from "../../../../enum/action-type";

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    ModalButtonComponent,
    ModalComponent,
    MuscleDetailsDisplayComponent,
    MuscleEntityFormComponent,
    NgIf,
    muscleDeleteFormComponent,
    UserDeleteFormComponent,
    UserDetailsDisplayComponent,
    UserRolesFormComponent
  ],
  templateUrl: './users-management-modal.component.html',
})
export class UsersManagementModalComponent {
  @Input() modalTitle!: string;
  @Input() userModalId!: string;
  @Input() user: User | undefined;
  @Input() action!: ActionType;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
}
