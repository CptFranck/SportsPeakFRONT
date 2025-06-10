import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExercisesComponent} from './prog-exercises.component';
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {of} from "rxjs";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('ProgExercisesComponent', () => {
  let component: ProgExercisesComponent;
  let fixture: ComponentFixture<ProgExercisesComponent>;

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
        {provide: ProgExerciseService, useValue: mockProgExerciseService}
      ],
      imports: [ProgExercisesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
