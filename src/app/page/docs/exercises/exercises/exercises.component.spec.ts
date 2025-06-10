import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExercisesComponent} from './exercises.component';
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {BehaviorSubject, of} from "rxjs";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  const mockMuscleService = {
    isLoading$: of(true),
    muscleList$: of([]),
    selectedMuscle$: of(undefined),
  };

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

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
