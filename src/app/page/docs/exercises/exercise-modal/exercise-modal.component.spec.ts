import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseModalComponent} from './exercise-modal.component';
import {ActionType} from "../../../../shared/model/enum/action-type";
import {generateTestExercise} from "../../../../utils/testFunctions";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {of} from "rxjs";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";

describe('ExerciseModalComponent', () => {
  let component: ExerciseModalComponent;
  let fixture: ComponentFixture<ExerciseModalComponent>;

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
      ],
      imports: [ExerciseModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseModalComponent);
    component = fixture.componentInstance;

    const exercise = generateTestExercise();
    fixture.componentRef.setInput('action', ActionType.create)
    fixture.componentRef.setInput('exercise', exercise)
    fixture.componentRef.setInput('modalTitle', "Title")
    fixture.componentRef.setInput('exerciseModalId', "Id")

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
