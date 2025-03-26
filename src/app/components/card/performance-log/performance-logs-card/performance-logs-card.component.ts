import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {DatePipe, NgIf} from "@angular/common";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {CollapseButtonComponent} from "../../../collapse-buton/collapse-button.component";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";

@Component({
  selector: 'app-performance-logs-card',
  imports: [
    DatePipe,
    CollapseButtonComponent,
    NgIf
  ],
  templateUrl: './performance-logs-card.component.html'
})
export class PerformanceLogsCardComponent {

  @Input() activeButton!: boolean;
  @Input() formCollapseId: string = "";
  @Input() performanceLog!: PerformanceLog;
  @Input() collapseBlockComponent?: CollapseBlockComponent;
  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  modPerformanceLog($event: any) {
    this.actionPerformanceLog.emit({
      actionType: ActionType.update,
      object: $event
    });
  }

  delPerformanceLog($event: any) {
    this.actionPerformanceLog.emit({
      actionType: ActionType.delete,
      object: $event
    });
  }
}
