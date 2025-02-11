import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseEntityFormComponent} from './exercise-entity-form.component';
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {BehaviorSubject} from "rxjs";
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {Muscle} from "../../../../interface/dto/muscle";
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../../interface/dto/exercise-type";

describe('ExerciseEntityFormComponent', () => {
  let component: ExerciseEntityFormComponent;
  let fixture: ComponentFixture<ExerciseEntityFormComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['muscles', 'isLoading']);
  mockMuscleService.muscles = new BehaviorSubject<Muscle[]>([]);
  mockMuscleService.isLoading = new BehaviorSubject<boolean>(true);

  let mockExerciseService: jasmine.SpyObj<ExerciseService>;

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('ExerciseTypeService', ['exerciseTypes', 'isLoading']);
  mockExerciseTypeService.exerciseTypes = new BehaviorSubject<ExerciseType[]>([]);
  mockExerciseTypeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService},
      ],
      imports: [ExerciseEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
