import {Component, input, output} from '@angular/core';
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

  readonly activeButton = input.required<boolean>();
  readonly formCollapseId = input<string>("");
  readonly performanceLog = input.required<PerformanceLog>();
  readonly collapseBlockComponent = input<CollapseBlockComponent>();

  readonly actionPerformanceLog = output<FormIndicator>();

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
