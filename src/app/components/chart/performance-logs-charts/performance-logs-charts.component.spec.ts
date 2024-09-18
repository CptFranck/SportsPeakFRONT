import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogsChartsComponent } from './performance-logs-charts.component';

describe('PerformanceLogsChartsComponent', () => {
  let component: PerformanceLogsChartsComponent;
  let fixture: ComponentFixture<PerformanceLogsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogsChartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
