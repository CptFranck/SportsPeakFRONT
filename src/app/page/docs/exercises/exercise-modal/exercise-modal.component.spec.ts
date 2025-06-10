import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseModalComponent} from './exercise-modal.component';
import {ActionEnum} from "../../../../shared/model/enum/action.enum";
import {generateTestExercise} from "../../../../utils/testFunctions";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {BehaviorSubject, of} from "rxjs";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";

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

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('ExerciseTypeService', ['exerciseTypes', 'isLoading']);
  mockExerciseTypeService.exerciseTypes = new BehaviorSubject<ExerciseType[]>([]);
  mockExerciseTypeService.isLoading = new BehaviorSubject<boolean>(true);
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
    fixture.componentRef.setInput('action', ActionEnum.create)
    fixture.componentRef.setInput('exercise', exercise)
    fixture.componentRef.setInput('modalTitle', "Title")
    fixture.componentRef.setInput('exerciseModalId', "Id")

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
