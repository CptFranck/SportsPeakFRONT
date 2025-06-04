import {Component, inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {UserLoggedService} from "../../../core/services/user-logged/user-logged.service";
import {User} from "../../../shared/model/dto/user";
import {ActionTypeEnum} from "../../../shared/model/enum/action-type.enum";
import {ModificationFieldEnum} from "../../../shared/model/enum/modification-field.enum";
import {UserSecurityComponent} from "../user-information/user-security/user-security.component";
import {
  UserInformationDisplayComponent
} from "../user-information/user-information-display/user-information-display.component";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {FormIndicator} from "../../../shared/model/common/form-indicator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user',
  imports: [
    UserInformationDisplayComponent,
    UserModalComponent,
    UserSecurityComponent
  ],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  user: User | undefined = undefined;
  action: ActionTypeEnum = ActionTypeEnum.update;
  modificationField: ModificationFieldEnum = ModificationFieldEnum.username;
  modalTemplate: TemplateRef<any> | undefined;
  userModalId: string = "userModal";
  modalTitle: string = "Update User";

  protected readonly ActionType = ActionTypeEnum;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);

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
      case ModificationFieldEnum.username:
        this.modalTitle = formIndicator.object.username;
        return;
      case ModificationFieldEnum.email:
        this.modalTitle = formIndicator.object.email;
        return;
      case ModificationFieldEnum.identity:
        this.modalTitle = formIndicator.object.firstName + " " + formIndicator.object.lastName;
        return;
      default:
        return;
    }
  }
}
