import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypeSelectorComponent} from './exercise-type-selector.component';
import {BehaviorSubject} from "rxjs";
import {ExerciseTypeService} from "../../../core/services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../interface/dto/exercise-type";

describe('ExerciseTypeSelectorComponent', () => {
  let component: ExerciseTypeSelectorComponent;
  let fixture: ComponentFixture<ExerciseTypeSelectorComponent>;
  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('MuscleService', ['muscles', 'isLoading']);
  mockExerciseTypeService.exerciseTypes = new BehaviorSubject<ExerciseType[]>([]);
  mockExerciseTypeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: ExerciseTypeService, useValue: mockExerciseTypeService}],

      imports: [ExerciseTypeSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
