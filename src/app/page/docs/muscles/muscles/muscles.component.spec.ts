import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MusclesComponent} from './muscles.component';
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {BehaviorSubject} from "rxjs";
import {Muscle} from "../../../../interface/dto/muscle";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {Exercise} from "../../../../interface/dto/exercise";

describe('MusclesComponent', () => {
  let component: MusclesComponent;
  let fixture: ComponentFixture<MusclesComponent>;

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['muscles', 'isLoading']);
  mockMuscleService.muscles = new BehaviorSubject<Muscle[]>([]);
  mockMuscleService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: ExerciseService, useValue: mockExerciseService},
      ],
      imports: [MusclesComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MusclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
