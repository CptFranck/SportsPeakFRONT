import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogsComponent } from './performance-logs.component';

describe('PerformanceLogsComponent', () => {
  let component: PerformanceLogsComponent;
  let fixture: ComponentFixture<PerformanceLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
