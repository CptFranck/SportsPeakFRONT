import {Component, Input} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-performance-logs-card',
  standalone: true,
  imports: [
    ModalButtonComponent,
    JsonPipe
  ],
  templateUrl: './performance-logs-card.component.html',
})
export class PerformanceLogsCardComponent {
  @Input() performanceLog: PerformanceLog | undefined;
}
