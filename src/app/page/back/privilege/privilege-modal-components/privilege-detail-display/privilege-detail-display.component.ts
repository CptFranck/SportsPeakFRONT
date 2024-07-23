import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Privilege} from "../../../../../interface/dto/privilege";

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
  @Input() privilege: Privilege | undefined;
  @Input() action!: string;
}
