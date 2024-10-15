import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogSortedByLogDateComponent } from './performance-log-sorted-by-log-date.component';

describe('PerformanceLogSortedByLogDateComponent', () => {
  let component: PerformanceLogSortedByLogDateComponent;
  let fixture: ComponentFixture<PerformanceLogSortedByLogDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogSortedByLogDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogSortedByLogDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
