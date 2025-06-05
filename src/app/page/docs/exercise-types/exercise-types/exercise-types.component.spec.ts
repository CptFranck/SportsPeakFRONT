import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypesComponent} from './exercise-types.component';
import {BehaviorSubject} from "rxjs";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {ExerciseType} from "../../../../shared/model/dto/exercise-type";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('ExerciseTypesComponent', () => {
  let component: ExerciseTypesComponent;
  let fixture: ComponentFixture<ExerciseTypesComponent>;

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('ExerciseTypeService', ['getExerciseTypes']);
  mockExerciseTypeService.exerciseTypes = new BehaviorSubject<ExerciseType[]>([]);
  mockExerciseTypeService.isLoading = new BehaviorSubject<boolean>(true);

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
