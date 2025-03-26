import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {
  UserDetailsDisplayComponent
} from "../../../../components/modal-component/user-management/user-details-display/user-details-display.component";
import {
  UserRolesFormComponent
} from "../../../../components/form/user-management/user-entity-form/user-roles-form.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {User} from "../../../../interface/dto/user";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-user-modal',
  imports: [
    ModalComponent,
    NgIf,
    UserDetailsDisplayComponent,
    UserRolesFormComponent
  ],
  templateUrl: './users-management-modal.component.html'
})
export class UsersManagementModalComponent {
  @Input() modalTitle!: string;
  @Input() userModalId!: string;
  @Input() user: User | undefined;
  @Input() action!: ActionType;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
}
