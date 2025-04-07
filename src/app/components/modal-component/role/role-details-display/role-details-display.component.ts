import {Component, input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Role} from "../../../../interface/dto/role";

@Component({
  selector: 'app-role-details-display',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './role-details-display.component.html'
})
export class RoleDetailsDisplayComponent {
  readonly role = input<Role>();
}
