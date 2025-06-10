import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MusclesComponent} from './muscles.component';
import {of} from "rxjs";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MusclesComponent', () => {
  let component: MusclesComponent;
  let fixture: ComponentFixture<MusclesComponent>;

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  const mockMuscleService = {
    isLoading$: of(true),
    muscleList$: of([]),
    selectedMuscle$: of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
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
