import {Component, effect, ElementRef, input, viewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import {addDateTime, stringToDate} from "../../../utils/time-functions";
import {PerformanceLog} from "../../../shared/model/dto/performance-log";
import {DictionaryItem} from "../../../shared/model/common/dictionary-item";
import {sortPerformanceLogsByDictionaryDate} from "../../../utils/performance-log-functions";

@Component({
  selector: 'app-performance-logs-set-chart',
  templateUrl: './performance-logs-set-chart.component.html'
})
export class PerformanceLogsSetChartComponent {

  readonly chartRef = viewChild.required<ElementRef>('chartRef');
  readonly performanceLogSet = input.required<PerformanceLog[]>();

  private data: any;
  private options: any;
  private chart: Chart | undefined;
  private reps: number[] = [];
  private dates: Date[] = [];
  private weights: number[] = [];
  private refChart: any;

  constructor() {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);

    effect(() => {
      this.refChart = this.chartRef().nativeElement.getContext('2d');
      if (this.chart)
        this.chart.destroy();
      this.defineData(this.performanceLogSet());
      this.defineOption();
      this.draw();
    })
  }

  resetZoom() {
    if (this.chart) this.chart.resetZoom();
  }

  draw() {
    if (this.refChart)
      this.chart = new Chart(this.refChart, {data: this.data, options: this.options});
  }

  defineOption() {
    const maxRep: number = Math.max(...this.reps);
    const minDate: Date = new Date(Math.min(...this.dates.map((d: Date) => d.getTime())));
    const maxDate: Date = new Date(Math.max(...this.dates.map((d: Date) => d.getTime())));

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: minDate,
          max: maxDate,
          type: 'time',
          title: {
            display: true,
            text: 'Date'
          },
          time: {
            unit: 'day',
            displayFormats: {
              quarter: 'MMM YYYY'
            }
          }
        },
        y: {
          min: 0,
          max: maxRep + 5,
          title: {
            display: true,
            text: 'Number of repetition'
          }
        }
      },
      plugins: {
        title: {
          text: 'number of reps and weight per performance of this set',
          display: true
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            threshold: 1,
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'xy',
          },
        }
      },
    }
  }

  private defineData(performanceLogSet: PerformanceLog[]) {
    this.reps = [];
    this.dates = [];
    this.weights = [];

    const performanceLogsSorted: DictionaryItem<PerformanceLog[]>[] = sortPerformanceLogsByDictionaryDate(performanceLogSet);
    performanceLogsSorted.forEach((performanceLogs: DictionaryItem<PerformanceLog[]>) => {
      const perfLogsLength: number = performanceLogs.value.length;
      performanceLogs.value.forEach((performanceLog: PerformanceLog, index: number) => {
        this.dates.push(addDateTime(stringToDate(performanceLog.logDate), index * 23 / perfLogsLength));
        this.weights.push(performanceLog.weight + index);
        this.reps.push(performanceLog.repetitionNumber);
      });
    });

    this.data = {
      labels: this.dates,
      datasets: [{
        type: 'line',
        label: 'reps',
        data: this.reps,
        borderWidth: 2
      }, {
        type: 'line',
        label: 'weight',
        data: this.weights,
        borderWidth: 2
      }]
    };
  }
}
