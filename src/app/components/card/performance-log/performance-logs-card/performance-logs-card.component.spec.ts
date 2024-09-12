import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogsCardComponent } from './performance-logs-card.component';

describe('PerformanceLogsCardComponent', () => {
  let component: PerformanceLogsCardComponent;
  let fixture: ComponentFixture<PerformanceLogsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
