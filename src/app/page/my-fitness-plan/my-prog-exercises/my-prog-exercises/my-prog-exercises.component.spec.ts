import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExercisesComponent} from './my-prog-exercises.component';
import {BehaviorSubject, of} from "rxjs";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
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

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('ProgExerciseService', ['progExercise', 'isLoading']);
  mockProgExerciseService.userProgExercises = new BehaviorSubject<ProgExercise[]>([]);
  mockProgExerciseService.isLoading = new BehaviorSubject<boolean>(true);

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
