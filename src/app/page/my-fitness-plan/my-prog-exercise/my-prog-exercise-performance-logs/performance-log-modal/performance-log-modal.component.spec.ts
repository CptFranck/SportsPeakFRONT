import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceLogModalComponent} from './performance-log-modal.component';
import {ActionEnum} from "../../../../../shared/model/enum/action.enum";
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../../utils/testFunctions";
import {User} from "../../../../../shared/model/dto/user";
import {Exercise} from "../../../../../shared/model/dto/exercise";
import {PerformanceLogService} from "../../../../../core/services/performance-log/performance-log.service";

describe('PerformanceLogModalComponent', () => {
  let component: PerformanceLogModalComponent;
  let fixture: ComponentFixture<PerformanceLogModalComponent>;

  let mockPerformanceLogService: jasmine.SpyObj<PerformanceLogService> =
    jasmine.createSpyObj('PerformanceLogService', ['deletePerformanceLog']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogModalComponent],
      providers: [
        {provide: PerformanceLogService, useValue: mockPerformanceLogService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceLogModalComponent);
    component = fixture.componentInstance;

    let mockUser: User = generateTestUser();
    let mockExercise: Exercise = generateTestExercise();
    fixture.componentRef.setInput('performanceLogModalTitle', "Title");
    fixture.componentRef.setInput('performanceLogModalId', "Id");
    fixture.componentRef.setInput('progExercise', generateTestProgExercise(mockUser, mockExercise));
    fixture.componentRef.setInput('targetSet', undefined);
    fixture.componentRef.setInput('performanceLog', undefined);
    fixture.componentRef.setInput('action', ActionEnum.create);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
