import {Component, input} from '@angular/core';
import {User} from "../../../shared/model/dto/user";
import {ActionTypeEnum} from "../../../shared/model/enum/action-type.enum";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {ModificationFieldEnum} from "../../../shared/model/enum/modification-field.enum";
import {UserEmailFormComponent} from "../../../components/form/user/user-email-form/user-email-form.component";
import {UserUsernameFormComponent} from "../../../components/form/user/user-username-form/user-username-form.component";
import {UserNameFormComponent} from "../../../components/form/user/user-name-form/user-name-form.component";
import {UserPasswordFormComponent} from "../../../components/form/user/user-password-form/user-password-form.component";
import {UserDeleteFormComponent} from "../../../components/form/user/user-delete-form/user-delete-form.component";

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
  readonly action = input.required<ActionTypeEnum>();
  readonly modification = input.required<ModificationFieldEnum>();

  protected readonly ActionType = ActionTypeEnum;
  protected readonly ModificationField = ModificationFieldEnum;
}
