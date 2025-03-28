import {Component, EventEmitter, Output, input} from '@angular/core';
import {Alert} from "../../interface/utils/alert";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-alert',
    imports: [
        NgIf
    ],
    templateUrl: './alert.component.html'
})
export class AlertComponent {
  readonly alert = input.required<Alert>();
  @Output() removedAlert: EventEmitter<Alert> = new EventEmitter();

  removeAlert() {
    this.removedAlert.emit(this.alert())
  }
}
