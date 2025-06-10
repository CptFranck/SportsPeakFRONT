import {Component, input} from '@angular/core';
import {Role} from "../../../model/dto/role";

@Component({
  selector: 'app-role-details-display',
  templateUrl: './role-details-display.component.html'
})
export class RoleDetailsDisplayComponent {
  readonly role = input<Role>();
}
