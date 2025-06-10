import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseCardDetailsComponent} from './prog-exercise-card-details.component';
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {of} from "rxjs";
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../utils/testFunctions";
import {User} from "../../../model/dto/user";
import {Exercise} from "../../../model/dto/exercise";

describe('ProgExerciseCardDetailsComponent', () => {
  let component: ProgExerciseCardDetailsComponent;
  let fixture: ComponentFixture<ProgExerciseCardDetailsComponent>;

  const mockProgExerciseService = {
    isLoading$: of(true),
    progExerciseList$: of([]),
    progExerciseSelected$: of(undefined),
    userProgExerciseList$: of([]),
  };

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
    fixture.componentRef.setInput('modalId', "Id");
    fixture.componentRef.setInput('progExercise', generateTestProgExercise(mockUser, mockExercise));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
