import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceLogEntityFormComponent} from './performance-log-entity-form.component';
import {PerformanceLogService} from "../../../../services/performance-log/performance-log.service";

describe('PerformanceLogEntityFormComponent', () => {
  let component: PerformanceLogEntityFormComponent;
  let fixture: ComponentFixture<PerformanceLogEntityFormComponent>;

  let mockPerformanceLogService: jasmine.SpyObj<PerformanceLogService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: PerformanceLogService, useValue: mockPerformanceLogService},
      ],
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
