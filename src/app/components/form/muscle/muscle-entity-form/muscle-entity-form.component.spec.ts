import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleEntityFormComponent} from './muscle-entity-form.component';
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {ExerciseService} from "../../../../services/exercise/exercise.service";
import {BehaviorSubject} from "rxjs";
import {Exercise} from "../../../../interface/dto/exercise";

describe('MuscleFormComponent', () => {
  let component: MuscleEntityFormComponent;
  let fixture: ComponentFixture<MuscleEntityFormComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService>;

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: ExerciseService, useValue: mockExerciseService}
      ],
      imports: [MuscleEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
