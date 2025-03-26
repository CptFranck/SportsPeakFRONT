import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {ActionType} from "../../../interface/enum/action-type";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {NgIf} from "@angular/common";
import {ModificationField} from "../../../interface/enum/modification-field";
import {UserEmailFormComponent} from "../../../components/form/user/user-email-form/user-email-form.component";
import {UserUsernameFormComponent} from "../../../components/form/user/user-username-form/user-username-form.component";
import {UserNameFormComponent} from "../../../components/form/user/user-name-form/user-name-form.component";
import {UserPasswordFormComponent} from "../../../components/form/user/user-password-form/user-password-form.component";
import {UserDeleteFormComponent} from "../../../components/form/user/user-delete-form/user-delete-form.component";

@Component({
    selector: 'app-user-modal',
    imports: [
        ModalComponent,
        NgIf,
        UserEmailFormComponent,
        UserUsernameFormComponent,
        UserNameFormComponent,
        UserPasswordFormComponent,
        UserDeleteFormComponent,
    ],
    templateUrl: './user-modal.component.html'
})
export class UserModalComponent {
  @Input() modalTitle!: string;
  @Input() userModalId!: string;
  @Input() user: User | undefined;
  @Input() action!: ActionType;
  @Input() modification!: ModificationField;

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  protected readonly ActionType = ActionType;
  protected readonly ModificationField = ModificationField;
}
