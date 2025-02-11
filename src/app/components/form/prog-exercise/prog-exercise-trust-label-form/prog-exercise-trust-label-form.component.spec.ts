import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseTrustLabelFormComponent} from './prog-exercise-trust-label-form.component';
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {User} from "../../../../interface/dto/user";
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../utils/testFunctions";
import {Exercise} from "../../../../interface/dto/exercise";

describe('TargetTrustLabelFormComponent', () => {
  let component: ProgExerciseTrustLabelFormComponent;
  let fixture: ComponentFixture<ProgExerciseTrustLabelFormComponent>;

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ProgExerciseService, useValue: mockProgExerciseService},
      ],
      imports: [ProgExerciseTrustLabelFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExerciseTrustLabelFormComponent);
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
