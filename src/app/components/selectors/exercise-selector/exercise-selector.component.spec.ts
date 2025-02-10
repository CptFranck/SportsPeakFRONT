import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseSelectorComponent} from './exercise-selector.component';
import {MuscleService} from "../../../services/muscle/muscle.service";
import {BehaviorSubject} from "rxjs";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../interface/dto/exercise";

describe('SelectExercisesComponent', () => {
  let component: ExerciseSelectorComponent;
  let fixture: ComponentFixture<ExerciseSelectorComponent>;
  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('MuscleService', ['muscles', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: ExerciseService, useValue: mockExerciseService}],
      imports: [ExerciseSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
