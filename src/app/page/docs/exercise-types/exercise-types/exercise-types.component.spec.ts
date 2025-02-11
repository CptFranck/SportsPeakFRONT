import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypesComponent} from './exercise-types.component';
import {BehaviorSubject} from "rxjs";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../../interface/dto/exercise-type";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {Exercise} from "../../../../interface/dto/exercise";

describe('ExerciseTypesComponent', () => {
  let component: ExerciseTypesComponent;
  let fixture: ComponentFixture<ExerciseTypesComponent>;

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('ExerciseTypeService', ['exerciseTypes', 'isLoading']);
  mockExerciseTypeService.exerciseTypes = new BehaviorSubject<ExerciseType[]>([]);
  mockExerciseTypeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService},
      ],
      imports: [ExerciseTypesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
