import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogModalComponent } from './performance-log-modal.component';

describe('PerformanceLogModalComponent', () => {
  let component: PerformanceLogModalComponent;
  let fixture: ComponentFixture<PerformanceLogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
