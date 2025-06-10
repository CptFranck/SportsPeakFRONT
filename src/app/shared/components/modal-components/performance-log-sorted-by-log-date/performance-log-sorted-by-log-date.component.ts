import {Component, input, output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {
  PerformanceLogsCardComponent
} from "../../cards/performance-logs-card/performance-logs-card.component";
import {CollapseBlockComponent} from "../../collapse-block/collapse-block.component";
import {DictionaryItem} from "../../../model/common/dictionary-item";
import {PerformanceLog} from "../../../model/dto/performance-log";
import {FormIndicator} from "../../../model/common/form-indicator";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";

@Component({
  selector: 'app-performance-log-sorted-by-log-date',
  imports: [
    PerformanceLogsCardComponent,
    DatePipe
  ],
  templateUrl: './performance-log-sorted-by-log-date.component.html'
})
export class PerformanceLogSortedByLogDateComponent {
  readonly formCollapseId = input.required<string>();
  readonly accordionParentIdDate = input.required<string>();
  readonly collapseBlock = input.required<CollapseBlockComponent>();
  readonly performanceLogsSortByDate = input.required<DictionaryItem<PerformanceLog[]>[]>();

  readonly actionPerformanceLog = output<FormIndicator>();

  readonly ifFirstShow = ifFirstShow;
  readonly ifNotFirstCollapse = ifNotFirstCollapse;

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
