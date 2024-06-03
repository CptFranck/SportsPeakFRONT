import {Component, Input} from '@angular/core';
import {AlertComponent} from "../alert/alert.component";
import {NgForOf} from "@angular/common";
import {Alert} from "../../interface/utils/alert";

@Component({
  selector: 'app-alert-display',
  standalone: true,
  imports: [
    AlertComponent,
    NgForOf
  ],
  templateUrl: './alert-display.component.html',
})
export class AlertDisplayComponent {
  @Input() alerts!: Alert[];

  removeAlert(event: Alert) {
    this.alerts.filter(alert => alert.id === event.id);
  }
}
