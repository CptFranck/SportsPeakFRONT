import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypeEntityFormComponent} from './exercise-type-entity-form.component';
import {BehaviorSubject} from "rxjs";
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {ExerciseTypeService} from "../../../../core/services/exercise-type/exercise-type.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('ExerciseTypeEntityFormComponent', () => {
  let component: ExerciseTypeEntityFormComponent;
  let fixture: ComponentFixture<ExerciseTypeEntityFormComponent>;

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService> =
    jasmine.createSpyObj('ExerciseTypeService', ['addExerciseType', 'modifyExerciseType']);

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: ExerciseService, useValue: mockExerciseService},
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService},
      ],
      imports: [ExerciseTypeEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypeEntityFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('exerciseType', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
