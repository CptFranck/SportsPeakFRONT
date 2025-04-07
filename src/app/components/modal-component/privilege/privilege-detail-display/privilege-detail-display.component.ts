import {Component, input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Privilege} from "../../../../interface/dto/privilege";

@Component({
  selector: 'app-privilege-details-display',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './privilege-detail-display.component.html'
})
export class PrivilegeDetailDisplayComponent {
  readonly privilege = input<Privilege>();
}
