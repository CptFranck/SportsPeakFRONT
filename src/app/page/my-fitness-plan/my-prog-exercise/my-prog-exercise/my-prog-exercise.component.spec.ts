import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseComponent} from './my-prog-exercise.component';
import {provideRouter} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {Exercise} from "../../../../interface/dto/exercise";
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";

describe('MyProgExerciseComponent', () => {
  let component: MyProgExerciseComponent;
  let fixture: ComponentFixture<MyProgExerciseComponent>;

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('MuscleService', ['progExercise', 'isLoading']);
  mockProgExerciseService.progExercise = new BehaviorSubject<ProgExercise | undefined>(undefined);
  mockProgExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  let mockTargetSetService: jasmine.SpyObj<TargetSetService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: TargetSetService, useValue: mockTargetSetService},
        {provide: ProgExerciseService, useValue: mockProgExerciseService},
      ],
      imports: [MyProgExerciseComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
