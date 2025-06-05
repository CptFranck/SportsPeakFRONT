import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceLogDeleteFormComponent} from './performance-log-delete-form.component';
import {PerformanceLogService} from "../../../../core/services/performance-log/performance-log.service";

describe('PerformanceLogDeleteFormComponent', () => {
  let component: PerformanceLogDeleteFormComponent;
  let fixture: ComponentFixture<PerformanceLogDeleteFormComponent>;

  let mockPerformanceLogService: jasmine.SpyObj<PerformanceLogService> =
    jasmine.createSpyObj('PerformanceLogService', ['deletePerformanceLog']);


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

    fixture.componentRef.setInput('performanceLog', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
