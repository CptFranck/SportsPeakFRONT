import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExercisesComponent} from './exercises.component';
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {BehaviorSubject} from "rxjs";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {Muscle} from "../../../../shared/model/dto/muscle";

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['allMuscle', 'loading']);
  mockMuscleService.allMuscle.and.returnValues(new BehaviorSubject<Muscle[]>([]));
  mockMuscleService.loading.and.returnValues(new BehaviorSubject<boolean>(true));

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('ExerciseTypeService', ['']);
  mockExerciseTypeService.exerciseTypes = new BehaviorSubject<ExerciseType[]>([]);
  mockExerciseTypeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
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
