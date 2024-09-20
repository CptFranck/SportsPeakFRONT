import {Component, Input} from '@angular/core';
import 'chartjs-adapter-date-fns';

import {DictionaryItem} from "../../../interface/utils/dictionary-item";
import {PerformanceLog} from "../../../interface/dto/performance-log";
import {NgForOf} from "@angular/common";
import {PerformanceLogsSetChartComponent} from "../performance-logs-set-chart/performance-logs-set-chart.component";

@Component({
  selector: 'app-performance-logs-charts',
  standalone: true,
  imports: [
    NgForOf,
    PerformanceLogsSetChartComponent
  ],
  templateUrl: './performance-logs-charts.component.html',
})
export class PerformanceLogsChartsComponent {

  performanceLogsInputSortedBySet!: DictionaryItem<PerformanceLog[]>[];
  performanceLogsInputSortedByLogDate!: DictionaryItem<PerformanceLog[]>[];

  @Input() set performanceLogsInputSortedBySetInput(performanceLogs: DictionaryItem<PerformanceLog[]>[]) {
    this.performanceLogsInputSortedBySet = performanceLogs;
  }

  @Input() set performanceLogsInputSortedByLogDateInput(performanceLogs: DictionaryItem<PerformanceLog[]>[]) {
    this.performanceLogsInputSortedByLogDate = performanceLogs;
  }
}
