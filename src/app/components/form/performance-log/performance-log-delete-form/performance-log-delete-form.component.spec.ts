import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceLogDeleteFormComponent} from './performance-log-delete-form.component';
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {PerformanceLogService} from "../../../../services/performance-log/performance-log.service";

describe('PerformanceLogDeleteFormComponent', () => {
  let component: PerformanceLogDeleteFormComponent;
  let fixture: ComponentFixture<PerformanceLogDeleteFormComponent>;
  let mockPerformanceLogService: jasmine.SpyObj<MuscleService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: PerformanceLogService, useValue: mockPerformanceLogService}
      ],
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
