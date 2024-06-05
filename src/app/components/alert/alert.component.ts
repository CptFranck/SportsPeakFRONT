import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Alert} from "../../interface/utils/alert";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() alert!: Alert;
  @Output() removedAlert: EventEmitter<Alert> = new EventEmitter();

  removeAlert() {
    this.removedAlert.emit(this.alert)
  }
}
