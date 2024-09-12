import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {JsonPipe} from "@angular/common";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-performance-logs-card',
  standalone: true,
  imports: [
    ModalButtonComponent,
    JsonPipe
  ],
  templateUrl: './performance-logs-card.component.html',
})
export class PerformanceLogsCardComponent implements OnInit {

  performanceLogDate!: Date;

  @Input() modalId!: string;
  @Input() performanceLog!: PerformanceLog;

  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  ngOnInit() {
    this.performanceLogDate = new Date(this.performanceLog?.logDate);
  }

  modPerformanceLog($event: any) {
    this.actionPerformanceLog.emit({
      actionType: ActionType.updatePerformance,
      object: $event
    });
  }

  delPerformanceLog($event: any) {
    this.actionPerformanceLog.emit({
      actionType: ActionType.deletePerformance,
      object: $event
    });
  }
}
