import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";
import {User} from "../../../interface/dto/user";
import {ModalButtonComponent} from "../../../components/modal/modal-button/modal-button.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-users-array',
  standalone: true,
  imports: [
    ModalButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './users-array.component.html',
})
export class UsersArrayComponent {
  @Input() users!: User[];
  @Input() modalId!: string;

  @Output() actionUser: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  showUserDetails(user: User): void {
    this.actionUser.emit({
      actionType: ActionType.read,
      object: user
    });
  }

  modifyUser(user: User) {
    this.actionUser.emit({
      actionType: ActionType.update,
      object: user
    });
  }
}
