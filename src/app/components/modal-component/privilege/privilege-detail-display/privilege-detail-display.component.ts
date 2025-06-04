import {Component, input} from '@angular/core';
import {Privilege} from "../../../../shared/model/dto/privilege";

@Component({
  selector: 'app-privilege-details-display',
  templateUrl: './privilege-detail-display.component.html'
})
export class PrivilegeDetailDisplayComponent {
  readonly privilege = input<Privilege>();
}
