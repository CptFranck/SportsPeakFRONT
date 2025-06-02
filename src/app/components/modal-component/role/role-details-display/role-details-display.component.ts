import {Component, input} from '@angular/core';
import {Role} from "../../../../interface/dto/role";

@Component({
  selector: 'app-role-details-display',
  templateUrl: './role-details-display.component.html'
})
export class RoleDetailsDisplayComponent {
  readonly role = input<Role>();
}
