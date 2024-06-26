import {Component, Input} from '@angular/core';
import {Privilege} from "../../../../interface/dto/privilege";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-privilege-details-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './privilege-detail-display.component.html',
})
export class PrivilegeDetailDisplayComponent {
  privilege: Privilege | undefined;

  @Input() action!: string;

  @Input() set privilegeInput(value: Privilege | undefined) {
    this.privilege = value;
  }
}
