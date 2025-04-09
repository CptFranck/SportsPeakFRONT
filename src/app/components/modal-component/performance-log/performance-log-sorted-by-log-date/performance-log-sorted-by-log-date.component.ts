import {Component, EventEmitter, input, Output} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {
  PerformanceLogsCardComponent
} from "../../../card/performance-log/performance-logs-card/performance-logs-card.component";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";
import {DictionaryItem} from "../../../../interface/utils/dictionary-item";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";

@Component({
  selector: 'app-performance-log-sorted-by-log-date',
  imports: [
    NgForOf,
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

  @Output() actionPerformanceLog = new EventEmitter<FormIndicator>();

  protected readonly ifFirstShow = ifFirstShow;
  protected readonly ifNotFirstCollapse = ifNotFirstCollapse;

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
