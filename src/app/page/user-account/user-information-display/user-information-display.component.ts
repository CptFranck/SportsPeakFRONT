import {Component, Input} from '@angular/core';
import {User} from "../../../interface/dto/user";

@Component({
  selector: 'app-user-information-display',
  standalone: true,
  imports: [],
  templateUrl: './user-information-display.component.html',
})
export class UserInformationDisplayComponent {

  @Input() user!: User | undefined;
  @Input() modalId!: string;

  onChangeEmail() {
  }

  onChangeUsername() {
  }

  onChangeName() {
  }
}
