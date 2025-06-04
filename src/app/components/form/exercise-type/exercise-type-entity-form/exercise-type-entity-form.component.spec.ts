import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypeEntityFormComponent} from './exercise-type-entity-form.component';
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {BehaviorSubject} from "rxjs";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {Exercise} from "../../../../shared/model/dto/exercise";

describe('ExerciseTypeEntityFormComponent', () => {
  let component: ExerciseTypeEntityFormComponent;
  let fixture: ComponentFixture<ExerciseTypeEntityFormComponent>;

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService>;

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService},
      ],
      imports: [ExerciseTypeEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypeEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
