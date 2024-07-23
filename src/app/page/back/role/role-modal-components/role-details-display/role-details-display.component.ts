import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Role} from "../../../../../interface/dto/role";

@Component({
  selector: 'app-role-details-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './role-details-display.component.html',
})
export class RoleDetailsDisplayComponent {
  @Input() role: Role | undefined;
  @Input() action!: string;
}
