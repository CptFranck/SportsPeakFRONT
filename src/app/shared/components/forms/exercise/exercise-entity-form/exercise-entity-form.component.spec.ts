import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseEntityFormComponent} from './exercise-entity-form.component';
import {ExerciseService} from "../../../../../core/services/exercise/exercise.service";
import {MuscleService} from "../../../../../core/services/muscle/muscle.service";
import {of} from "rxjs";
import {ExerciseTypeService} from "../../../../../core/services/exercise-type/exercise-type.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ProgExerciseService} from "../../../../../core/services/prog-exercise/prog-exercise.service";

describe('ExerciseEntityFormComponent', () => {
  let component: ExerciseEntityFormComponent;
  let fixture: ComponentFixture<ExerciseEntityFormComponent>;

  const mockProgExerciseService = {
    isLoading$: of(true),
    progExerciseList$: of([]),
    progExerciseSelected$: of(undefined),
    userProgExerciseList$: of([]),
  };

  const mockMuscleService = {
    isLoading$: of(true),
    muscleList$: of([]),
    selectedMuscle$: of(undefined),
  };

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['addExercise', 'modifyExercise']);

  const mockExerciseTypeService = {
    isLoading$: of(true),
    exerciseTypeList$: of([]),
    selectedExerciseType$: of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService},
        {provide: ProgExerciseService, useValue: mockProgExerciseService},
      ],
      imports: [ExerciseEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseEntityFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('exercise', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
