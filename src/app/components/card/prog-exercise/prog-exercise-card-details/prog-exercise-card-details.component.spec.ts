import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseCardDetailsComponent} from './prog-exercise-card-details.component';
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {BehaviorSubject} from "rxjs";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../utils/testFunctions";
import {User} from "../../../../interface/dto/user";
import {Exercise} from "../../../../interface/dto/exercise";

describe('ProgExerciseCardDetailsComponent', () => {
  let component: ProgExerciseCardDetailsComponent;
  let fixture: ComponentFixture<ProgExerciseCardDetailsComponent>;

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('MuscleService', ['progExercise', 'isLoading']);
  mockProgExerciseService.progExercise = new BehaviorSubject<ProgExercise | undefined>(undefined);
  mockProgExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ProgExerciseService, useValue: mockProgExerciseService},
      ],
      imports: [ProgExerciseCardDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExerciseCardDetailsComponent);
    component = fixture.componentInstance;

    let mockUser: User = generateTestUser();
    let mockExercise: Exercise = generateTestExercise();
    component.progExercise = generateTestProgExercise(mockUser, mockExercise);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
