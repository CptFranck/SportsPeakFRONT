import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {ActionType} from "../../../enum/action-type";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {UserEmailFormComponent} from "../user-modal-components/user-email-form/user-email-form.component";
import {NgIf} from "@angular/common";
import {ModificationField} from "../../../enum/modification-field";
import {UserUsernameFormComponent} from "../user-modal-components/user-username-form/user-username-form.component";
import {UserNameFormComponent} from "../user-modal-components/user-name-form/user-name-form.component";
import {UserPasswordFormComponent} from "../user-modal-components/user-password-form/user-password-form.component";
import {UserDeleteFormComponent} from "../user-modal-components/user-delete-form/user-delete-form.component";

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    ModalComponent,
    UserEmailFormComponent,
    NgIf,
    UserUsernameFormComponent,
    UserNameFormComponent,
    UserPasswordFormComponent,
    UserDeleteFormComponent
  ],
  templateUrl: './user-modal.component.html',
})
export class UserModalComponent {
  @Input() modalTitle!: string;
  @Input() userModalId!: string;
  @Input() user: User | undefined;
  @Input() action!: ActionType;
  @Input() modification!: ModificationField;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ModificationField = ModificationField;
  protected readonly ActionType = ActionType;
}
