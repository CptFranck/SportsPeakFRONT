import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExercisesComponent} from './exercises.component';
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {BehaviorSubject} from "rxjs";
import {Exercise} from "../../../../interface/dto/exercise";
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {Muscle} from "../../../../interface/dto/muscle";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../../interface/dto/exercise-type";

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['muscles', 'isLoading']);
  mockMuscleService.muscles = new BehaviorSubject<Muscle[]>([]);
  mockMuscleService.isLoading = new BehaviorSubject<boolean>(true);

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
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService}
      ],
      imports: [ExercisesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
