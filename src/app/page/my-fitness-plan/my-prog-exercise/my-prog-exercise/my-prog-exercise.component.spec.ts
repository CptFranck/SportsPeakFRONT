import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseComponent} from './my-prog-exercise.component';
import {provideRouter} from "@angular/router";
import {BehaviorSubject, of} from "rxjs";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MyProgExerciseComponent', () => {
  let component: MyProgExerciseComponent;
  let fixture: ComponentFixture<MyProgExerciseComponent>;

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('ProgExerciseService', ['modifyProgExerciseTrustLabel']);
  mockProgExerciseService.progExercise = new BehaviorSubject<ProgExercise | undefined>(undefined);
  mockProgExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  let mockTargetSetService: jasmine.SpyObj<TargetSetService> =
    jasmine.createSpyObj('TargetSetService', ['']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
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
