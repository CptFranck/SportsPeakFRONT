import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypesComponent} from './exercise-types.component';
import {of} from "rxjs";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('ExerciseTypesComponent', () => {
  let component: ExerciseTypesComponent;
  let fixture: ComponentFixture<ExerciseTypesComponent>;

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  const mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('ExerciseTypeService', ['getExerciseTypes']);
  mockExerciseTypeService.getExerciseTypes.and.returnValues();

  Object.defineProperty(mockExerciseTypeService, 'isLoading$', {
    get: () => of(true),
  });

  Object.defineProperty(mockExerciseTypeService, 'exerciseTypeList$', {
    get: () => of(undefined),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
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
