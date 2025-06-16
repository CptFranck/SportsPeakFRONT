import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CurrentUserService} from "../../../core/services/current-user/current-user.service";
import {User} from "../../../shared/model/dto/user";
import {UserSecurityComponent} from "../user-information/user-security/user-security.component";
import {
  UserInformationDisplayComponent
} from "../user-information/user-information-display/user-information-display.component";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {FormIndicator} from "../../../shared/model/common/form-indicator";
import {Subject, takeUntil} from "rxjs";
import {ModificationFieldEnum} from "../../../shared/model/enum/user-modification-field";
import {ActionType} from "../../../shared/model/enum/action-type";

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
  action: ActionType = ActionType.update;
  modificationField: ModificationFieldEnum = ModificationFieldEnum.username;
  userModalId: string = "userModal";
  modalTitle: string = "Update User";

  protected readonly ActionType = ActionType;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly currentUserService: CurrentUserService = inject(CurrentUserService);

  ngOnInit() {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) => this.user = user);
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
