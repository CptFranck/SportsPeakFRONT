import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';

import {DictionaryArray} from "../../../interface/utils/dictionary-array";
import {PerformanceLog} from "../../../interface/dto/performance-log";
import {randomIntFromInterval} from "../../../utils/time-functions";

@Component({
  selector: 'app-performance-logs-charts',
  standalone: true,
  imports: [],
  templateUrl: './performance-logs-charts.component.html',
  styleUrl: './performance-logs-charts.component.css'
})
export class PerformanceLogsChartsComponent implements AfterViewInit {

  performanceLogs!: DictionaryArray<PerformanceLog[]>[];

  @ViewChild('chart', {static: false}) chartRef!: ElementRef;

  @Input() set performanceLogsInput(performanceLogs: DictionaryArray<PerformanceLog[]>[]) {
    this.performanceLogs = performanceLogs;
  }


  ngAfterViewInit() {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
    let htmlRef = this.chartRef.nativeElement.getContext('2d');

    let dates: string[] = [];
    let datesBis: Date[] = [];
    let weights: number[] = [];
    let reps: number[] = [];

    // this.performanceLogs.forEach((performanceLogs: DictionaryArray<PerformanceLog[]>) => {
    //   const perfLogsLength: number = performanceLogs.value.length;
    //   performanceLogs.value.forEach((performanceLog: PerformanceLog, index: number) => {
    //     dates.push(stringToDate(performanceLog.logDate).toISOString().substring(0, 10));
    //
    //     datesBis.push(addDateTime(stringToDate(performanceLog.logDate), index * 23 / perfLogsLength));
    //     weights.push(performanceLog.weight + index);
    //     reps.push(performanceLog.repetitionNumber);
    //   })
    // })

    let nbRep: number;
    let weight: number = 0;
    let progRep: number = 0;
    let progWeight: number = 0;
    for (let i: number = 0; i < 50; i++) {

      if (i % 10 === 0) {
        progRep += 1
        progWeight += 5
      }

      if (i % 5 === 0) {
        weight = 25;
        nbRep = randomIntFromInterval(5, 10)
      } else if (i % 4 === 0) {
        weight = 20;
        nbRep = randomIntFromInterval(6, 10)
      } else if (i % 3 === 0) {
        weight = 15;
        nbRep = randomIntFromInterval(7, 10)
      } else if (i % 2 === 0) {
        weight = 10;
        nbRep = randomIntFromInterval(8, 10)
      } else {
        weight = 5;
        nbRep = 10
      }
      reps.push(nbRep + progRep)
      weights.push(weight + progWeight)
      let now: Date = new Date()
      now.setDate(now.getDate() + i)
      datesBis.push(now)
    }

    console.log(weights, "weigh")
    console.log(reps, "rep")

    const data: any = {
      labels: datesBis,
      datasets: [{
        type: 'bar',
        label: 'weight',
        data: weights,
        borderWidth: 1
      }, {
        type: 'line',
        label: 'reps',
        data: reps,
        borderWidth: 1
      }]
    };

    const options: any = {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          }
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            threshold: 5,
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

    new Chart(htmlRef, {
      data: data,
      options: options
    });
  }
}
