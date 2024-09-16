import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogEntityFormComponent } from './performance-log-entity-form.component';

describe('PerformanceLogEntityFormComponent', () => {
  let component: PerformanceLogEntityFormComponent;
  let fixture: ComponentFixture<PerformanceLogEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
