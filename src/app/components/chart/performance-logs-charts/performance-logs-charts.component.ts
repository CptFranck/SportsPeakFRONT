import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-performance-logs-charts',
  standalone: true,
  imports: [],
  templateUrl: './performance-logs-charts.component.html',
  styleUrl: './performance-logs-charts.component.css'
})
export class PerformanceLogsChartsComponent implements AfterViewInit {

  @ViewChild('chart', {static: false}) chartRef!: ElementRef;

  ngAfterViewInit() {
    Chart.register(...registerables);
    let htmlRef = this.chartRef.nativeElement.getContext('2d');
    const data: any = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    };

    const option: any = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

    new Chart(htmlRef, {
      type: 'bar',
      data: data,
      options: option
    });
  }
}
