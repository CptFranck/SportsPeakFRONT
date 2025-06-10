import {Component, input} from '@angular/core';
import {
  UserDetailsDisplayComponent
} from "../../../../components/modal-component/user-management/user-details-display/user-details-display.component";
import {
  UserRolesFormComponent
} from "../../../../components/form/user-management/user-entity-form/user-roles-form.component";
import {ModalComponent} from "../../../../components/modal/modal/modal.component";
import {User} from "../../../../shared/model/dto/user";
import {ActionType} from "../../../../shared/model/enum/action-type";
import {UserDeleteFormComponent} from "../../../../components/form/user/user-delete-form/user-delete-form.component";

@Component({
  selector: 'app-user-modal',
  imports: [
    ModalComponent,
    UserDetailsDisplayComponent,
    UserRolesFormComponent,
    UserDeleteFormComponent
  ],
  templateUrl: './users-management-modal.component.html'
})
export class UsersManagementModalComponent {
  readonly modalTitle = input.required<string>();
  readonly userModalId = input.required<string>();
  readonly user = input.required<User | undefined>();
  readonly action = input.required<ActionType>();

  protected readonly ActionType = ActionType;
}
