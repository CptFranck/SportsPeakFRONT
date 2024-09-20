import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import {PerformanceLog} from "../../../interface/dto/performance-log";
import {addDateTime, stringToDate} from "../../../utils/time-functions";
import {DictionaryItem} from "../../../interface/utils/dictionary-item";
import {sortPerformanceLogsByDictionaryDate} from "../../../utils/performance-log-functions";

@Component({
  selector: 'app-performance-logs-set-chart',
  standalone: true,
  imports: [],
  templateUrl: './performance-logs-set-chart.component.html',
  styleUrl: './performance-logs-set-chart.component.css'
})
export class PerformanceLogsSetChartComponent implements AfterViewInit {

  chartRep: Chart | undefined;
  chartWeight: Chart | undefined;

  @Input() performanceLogSet!: PerformanceLog[];

  @ViewChild('chartRep', {static: false}) chartRepRef!: ElementRef;
  @ViewChild('chartWeight', {static: false}) chartWeightRef!: ElementRef;

  ngAfterViewInit() {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);

    let chartRepRef = this.chartRepRef.nativeElement.getContext('2d');

    let datesBis: Date[] = [];
    let weights: number[] = [];
    let reps: number[] = [];

    const performanceLogsSorted: DictionaryItem<PerformanceLog[]>[] = sortPerformanceLogsByDictionaryDate(this.performanceLogSet)
    performanceLogsSorted.forEach((performanceLogs: DictionaryItem<PerformanceLog[]>) => {
      const perfLogsLength: number = performanceLogs.value.length;
      performanceLogs.value.forEach((performanceLog: PerformanceLog, index: number) => {
        datesBis.push(addDateTime(stringToDate(performanceLog.logDate), index * 23 / perfLogsLength));
        weights.push(performanceLog.weight + index);
        reps.push(performanceLog.repetitionNumber);
      })
    })

    const maxRep: number = Math.max(...reps);
    const minDate: Date = new Date(Math.min(...datesBis.map((d: Date) => d.getTime())));
    const maxDate: Date = new Date(Math.max(...datesBis.map((d: Date) => d.getTime())));

    const dataRep: any = {
      labels: datesBis,
      datasets: [{
        type: 'line',
        label: 'reps',
        data: reps,
        borderWidth: 2
      }, {
        type: 'line',
        label: 'weight',
        data: weights,
        borderWidth: 2
      }]
    };

    const options: any = {
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
            text: 'number of repetition'
          }
        }
      },
      plugins: {
        title: {
          text: 'number of repetition per performance of current set',
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

    this.chartRep = new Chart(chartRepRef, {
      data: dataRep,
      options: options
    });
  }
}
