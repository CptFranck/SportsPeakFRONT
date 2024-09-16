import {Component, inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {UserLoggedService} from "../../../services/user-logged/user-logged.service";
import {User} from "../../../interface/dto/user";
import {ActionType} from "../../../interface/enum/action-type";
import {NgIf} from "@angular/common";
import {ModificationField} from "../../../interface/enum/modification-field";
import {UserSecurityComponent} from "../user-information/user-security/user-security.component";
import {
  UserDetailsDisplayComponent
} from "../../back/user-management/user-modal-components/user-details-display/user-details-display.component";
import {ModalComponent} from "../../../components/modal/modal/modal.component";
import {
  UserInformationDisplayComponent
} from "../user-information/user-information-display/user-information-display.component";
import {UserDeleteFormComponent} from "../user-modal-components/user-delete-form/user-delete-form.component";
import {
  UserRolesFormComponent
} from "../../../components/form/user-management/user-entity-form/user-roles-form.component";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgIf,
    UserDetailsDisplayComponent,
    ModalComponent,
    UserInformationDisplayComponent,
    UserDeleteFormComponent,
    UserRolesFormComponent,
    UserModalComponent,
    UserSecurityComponent
  ],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {

  user: User | undefined = undefined;
  action: ActionType = ActionType.update;
  modificationField: ModificationField = ModificationField.username;
  modalTemplate: TemplateRef<any> | undefined;
  userModalId: string = "userModal";
  modalTitle: string = "Update User";

  protected readonly ActionType = ActionType;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) => {
        this.user = user;
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setUser(formIndicator: FormIndicator) {
    this.action = formIndicator.actionType;

    if (formIndicator.modificationField)
      this.modificationField = formIndicator.modificationField;

    switch (formIndicator.modificationField) {
      case ModificationField.username:
        this.modalTitle = formIndicator.object.username;
        return;
      case ModificationField.email:
        this.modalTitle = formIndicator.object.email;
        return;
      case ModificationField.name:
        this.modalTitle = formIndicator.object.firstName + " " + formIndicator.object.lastName;
        return;
      default:
        return;
    }
  }
}
