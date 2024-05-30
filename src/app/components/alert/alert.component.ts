import {Component, Input} from '@angular/core';
import {alertType} from "../enum/alert-type";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() title: string = ""
  @Input() text: string = "A simple primary alert—check it out! ";
  @Input() type: alertType = alertType.info;

  constructor() {
    switch (this.type) {
      case alertType.error:
        this.title = "Error !";
        return
      case alertType.info:
        this.title = "Information !";
        return;
      case alertType.warning:
        this.title = "Warning !"
        return;
      case alertType.success:
        this.title = "Success !"
        return;
      default:
        return;
    }
  }
}
