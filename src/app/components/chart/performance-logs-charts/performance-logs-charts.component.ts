import {Component, EventEmitter, Input, Output} from '@angular/core';
import 'chartjs-adapter-date-fns';

import {DictionaryItem} from "../../../interface/utils/dictionary-item";
import {PerformanceLog} from "../../../interface/dto/performance-log";
import {NgForOf} from "@angular/common";
import {PerformanceLogsSetChartComponent} from "../performance-logs-set-chart/performance-logs-set-chart.component";
import {
  PerformanceLogsCardComponent
} from "../../card/performance-log/performance-logs-card/performance-logs-card.component";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {CollapseBlockComponent} from "../../collapse-block/collapse-block.component";
import {ifFirstShow, ifNotFirstCollapse} from "../../../utils/accordion-function";

@Component({
  selector: 'app-performance-logs-charts',
  standalone: true,
  imports: [
    NgForOf,
    PerformanceLogsSetChartComponent,
    PerformanceLogsCardComponent
  ],
  templateUrl: './performance-logs-charts.component.html',
})
export class PerformanceLogsChartsComponent {

  performanceLogsInputSortedBySet!: DictionaryItem<PerformanceLog[]>[];
  performanceLogsInputSortedByLogDate!: DictionaryItem<PerformanceLog[]>[];

  @Input() collapseBlock!: CollapseBlockComponent;
  @Input() accordionParentIdGraph!: string;

  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();
  protected readonly ifFirstShow = ifFirstShow;
  protected readonly ifNotFirstCollapse = ifNotFirstCollapse;

  @Input() set performanceLogsInputSortedBySetInput(performanceLogs: DictionaryItem<PerformanceLog[]>[]) {
    this.performanceLogsInputSortedBySet = performanceLogs;
  }

  @Input() set performanceLogsInputSortedByLogDateInput(performanceLogs: DictionaryItem<PerformanceLog[]>[]) {
    this.performanceLogsInputSortedByLogDate = performanceLogs;
  }

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
