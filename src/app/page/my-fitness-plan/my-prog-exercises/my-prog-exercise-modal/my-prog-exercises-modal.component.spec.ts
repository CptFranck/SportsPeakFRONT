import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExercisesModalComponent} from './my-prog-exercises-modal.component';
import {ActionEnum} from "../../../../shared/model/enum/action.enum";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {of} from "rxjs";

describe('MyProgExercisesModalComponent', () => {
  let component: MyProgExercisesModalComponent;
  let fixture: ComponentFixture<MyProgExercisesModalComponent>;

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('ProgExerciseService', ['progExercise', 'isLoading']);

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExercisesModalComponent],
      providers: [
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ProgExerciseService, useValue: mockProgExerciseService},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExercisesModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "Title");
    fixture.componentRef.setInput('progExerciseModalId', "Id");
    fixture.componentRef.setInput('progExercise', undefined);
    fixture.componentRef.setInput('action', ActionEnum.create);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
