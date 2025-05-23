import {Component, input, output} from '@angular/core';
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
  imports: [
    NgForOf,
    PerformanceLogsSetChartComponent,
    PerformanceLogsCardComponent
  ],
  templateUrl: './performance-logs-charts.component.html'
})
export class PerformanceLogsChartsComponent {

  readonly collapseBlock = input.required<CollapseBlockComponent>();
  readonly accordionParentIdGraph = input.required<string>();
  readonly performanceLogsInputSortedBySet = input.required<DictionaryItem<PerformanceLog[]>[]>();

  readonly actionPerformanceLog = output<FormIndicator>();

  readonly ifFirstShow = ifFirstShow;
  readonly ifNotFirstCollapse = ifNotFirstCollapse;

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
