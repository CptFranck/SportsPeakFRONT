import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogSortedBySetComponent } from './performance-log-sorted-by-set.component';

describe('PerformanceLogSortedBySetComponent', () => {
  let component: PerformanceLogSortedBySetComponent;
  let fixture: ComponentFixture<PerformanceLogSortedBySetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogSortedBySetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogSortedBySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
