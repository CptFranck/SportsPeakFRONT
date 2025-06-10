import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseSelectComponent} from './exercise-select.component';
import {ExerciseService} from "../../../core/services/exercise/exercise.service";
import {of} from "rxjs";

describe('ExerciseSelectComponent', () => {
  let component: ExerciseSelectComponent;
  let fixture: ComponentFixture<ExerciseSelectComponent>;
  
  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ExerciseService, useValue: mockExerciseService}
      ],
      imports: [ExerciseSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
