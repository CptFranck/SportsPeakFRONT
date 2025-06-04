import {Component, input, output} from '@angular/core';
import {PerformanceLog} from "../../../../shared/model/dto/performance-log";
import {DatePipe} from "@angular/common";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {CollapseButtonComponent} from "../../../collapse-buton/collapse-button.component";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

@Component({
  selector: 'app-performance-logs-card',
  imports: [
    DatePipe,
    CollapseButtonComponent,
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
      actionType: ActionEnum.update,
      object: $event
    });
  }

  delPerformanceLog($event: any) {
    this.actionPerformanceLog.emit({
      actionType: ActionEnum.delete,
      object: $event
    });
  }
}
