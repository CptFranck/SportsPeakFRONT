import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseEntityFormComponent} from './my-prog-exercise-entity-form.component';
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {of} from "rxjs";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";

describe('MyProgExerciseEntityFormComponent', () => {
  let component: MyProgExerciseEntityFormComponent;
  let fixture: ComponentFixture<MyProgExerciseEntityFormComponent>;

  const mockUserLoggedService = {
    currentUser$: of(undefined),
  };

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('ProgExerciseService', ['addProgExercise', 'modifyProgExercise', 'deleteProgExercises']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: UserLoggedService, useValue: mockUserLoggedService},
        {provide: ProgExerciseService, useValue: mockProgExerciseService}
      ],
      imports: [MyProgExerciseEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExerciseEntityFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('progExercise', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
