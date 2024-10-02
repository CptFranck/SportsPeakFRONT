import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import {addDateTime, stringToDate} from "../../../utils/time-functions";
import {PerformanceLog} from "../../../interface/dto/performance-log";
import {DictionaryItem} from "../../../interface/utils/dictionary-item";
import {sortPerformanceLogsByDictionaryDate} from "../../../utils/performance-log-functions";

@Component({
  selector: 'app-performance-logs-set-chart',
  standalone: true,
  imports: [],
  templateUrl: './performance-logs-set-chart.component.html',
})
export class PerformanceLogsSetChartComponent implements AfterViewInit {

  refChart: any;

  reps: number[] = [];
  dates: Date[] = [];
  weights: number[] = [];

  data: any;
  options: any;
  chart: Chart | undefined;

  performanceLogSet!: PerformanceLog[];
  @ViewChild('chartRef', {static: false}) chartRef!: ElementRef;

  @Input() set performanceLogSetInput(performanceLogs: PerformanceLog[] | undefined) {
    if (performanceLogs) {
      this.performanceLogSet = performanceLogs
      this.defineData();
      this.defineOption();
      this.draw();
    }
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);

    this.refChart = this.chartRef.nativeElement.getContext('2d');

    this.initChart()
  }

  initChart() {
    this.defineData()
    this.defineOption()
    this.draw()
  }

  resetZoom() {
    if (this.chart) {
      this.chart.resetZoom()
    }
  }

  draw() {
    if (this.refChart)
      this.chart = new Chart(this.refChart, {
        data: this.data,
        options: this.options
      });
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

  private defineData() {
    this.reps = [];
    this.dates = [];
    this.weights = [];

    const performanceLogsSorted: DictionaryItem<PerformanceLog[]>[] = sortPerformanceLogsByDictionaryDate(this.performanceLogSet);
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
