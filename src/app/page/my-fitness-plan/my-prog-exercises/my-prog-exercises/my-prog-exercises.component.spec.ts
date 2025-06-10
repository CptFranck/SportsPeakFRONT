import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExercisesComponent} from './my-prog-exercises.component';
import {of} from "rxjs";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MyProgExercisesComponent', () => {
  let component: MyProgExercisesComponent;
  let fixture: ComponentFixture<MyProgExercisesComponent>;

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  const mockProgExerciseService = {
    isLoading$: of(true),
    progExerciseList$: of([]),
    progExerciseSelected$: of(undefined),
    userProgExerciseList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
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
