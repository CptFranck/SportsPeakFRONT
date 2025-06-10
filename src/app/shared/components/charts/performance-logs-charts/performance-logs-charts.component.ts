import {Component, input, output} from '@angular/core';
import 'chartjs-adapter-date-fns';

import {DictionaryItem} from "../../../model/common/dictionary-item";
import {PerformanceLog} from "../../../model/dto/performance-log";
import {PerformanceLogsSetChartComponent} from "../performance-logs-set-chart/performance-logs-set-chart.component";
import {
  PerformanceLogsCardComponent
} from "../../cards/performance-logs-card/performance-logs-card.component";
import {FormIndicator} from "../../../model/common/form-indicator";
import {CollapseBlockComponent} from "../../collapse-block/collapse-block.component";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";

@Component({
  selector: 'app-performance-logs-charts',
  imports: [
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
