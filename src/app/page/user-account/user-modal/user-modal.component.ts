import {Component, input} from '@angular/core';
import {User} from "../../../shared/model/dto/user";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {UserEmailFormComponent} from "../../../shared/components/forms/user/user-email-form/user-email-form.component";
import {UserUsernameFormComponent} from "../../../shared/components/forms/user/user-username-form/user-username-form.component";
import {UserNameFormComponent} from "../../../shared/components/forms/user/user-name-form/user-name-form.component";
import {UserPasswordFormComponent} from "../../../shared/components/forms/user/user-password-form/user-password-form.component";
import {UserDeleteFormComponent} from "../../../shared/components/forms/user/user-delete-form/user-delete-form.component";
import {ModificationFieldEnum} from "../../../shared/model/enum/user-modification-field";
import {ActionType} from "../../../shared/model/enum/action-type";

@Component({
  selector: 'app-user-modal',
  imports: [
    ModalComponent,
    UserEmailFormComponent,
    UserUsernameFormComponent,
    UserNameFormComponent,
    UserPasswordFormComponent,
    UserDeleteFormComponent,
  ],
  templateUrl: './user-modal.component.html'
})
export class UserModalComponent {
  readonly modalTitle = input.required<string>();
  readonly userModalId = input.required<string>();
  readonly user = input.required<User | undefined>();
  readonly action = input.required<ActionType>();
  readonly modification = input.required<ModificationFieldEnum>();

  protected readonly ActionType = ActionType;
  protected readonly ModificationField = ModificationFieldEnum;
}
