import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceLogDeleteFormComponent } from './performance-log-delete-form.component';

describe('PerformanceLogDeleteFormComponent', () => {
  let component: PerformanceLogDeleteFormComponent;
  let fixture: ComponentFixture<PerformanceLogDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogDeleteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceLogDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
