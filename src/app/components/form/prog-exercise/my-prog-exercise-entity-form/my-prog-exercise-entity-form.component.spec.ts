import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseEntityFormComponent} from './my-prog-exercise-entity-form.component';
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../../shared/model/dto/user";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";

describe('MyProgExerciseEntityFormComponent', () => {
  let component: MyProgExerciseEntityFormComponent;
  let fixture: ComponentFixture<MyProgExerciseEntityFormComponent>;

  let mockUserLoggedService: jasmine.SpyObj<UserLoggedService> =
    jasmine.createSpyObj('UserLoggedService', ['currentUser']);
  mockUserLoggedService.currentUser = new BehaviorSubject<User | undefined>(undefined);

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

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
