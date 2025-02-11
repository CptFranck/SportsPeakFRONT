import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExercisesComponent} from './my-prog-exercises.component';
import {BehaviorSubject} from "rxjs";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {Exercise} from "../../../../interface/dto/exercise";

describe('MyProgExercisesComponent', () => {
  let component: MyProgExercisesComponent;
  let fixture: ComponentFixture<MyProgExercisesComponent>;

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('ProgExerciseService', ['progExercise', 'isLoading']);
  mockProgExerciseService.userProgExercises = new BehaviorSubject<ProgExercise[]>([]);
  mockProgExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ProgExerciseService, useValue: mockProgExerciseService}
      ],
      imports: [MyProgExercisesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
