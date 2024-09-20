import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogsSetChartComponent } from './performance-logs-set-chart.component';

describe('PerformanceLogsSetChartComponent', () => {
  let component: PerformanceLogsSetChartComponent;
  let fixture: ComponentFixture<PerformanceLogsSetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogsSetChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogsSetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
