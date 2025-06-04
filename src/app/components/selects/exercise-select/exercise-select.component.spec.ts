import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ExerciseSelectComponent} from './exercise-select.component';
import {BehaviorSubject} from "rxjs";
import {ExerciseService} from "../../../core/services/exercise/exercise.service";
import {Exercise} from "../../../interface/dto/exercise";

describe('ExerciseSelectComponent', () => {
  let component: ExerciseSelectComponent;
  let fixture: ComponentFixture<ExerciseSelectComponent>;
  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

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
