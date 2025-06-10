import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExerciseDetailsDisplayComponent} from './my-prog-exercise-details-display.component';
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../utils/testFunctions";
import {User} from "../../../model/dto/user";
import {Exercise} from "../../../model/dto/exercise";
import {ProgExercise} from "../../../model/dto/prog-exercise";

describe('MyProgExerciseDetailsDisplayComponent', () => {
  let component: MyProgExerciseDetailsDisplayComponent;
  let fixture: ComponentFixture<MyProgExerciseDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExerciseDetailsDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExerciseDetailsDisplayComponent);
    component = fixture.componentInstance;

    const userMock: User = generateTestUser();
    const exerciseMock: Exercise = generateTestExercise();
    const mockProgExercise: ProgExercise = generateTestProgExercise(userMock, exerciseMock);
    fixture.componentRef.setInput('progExercise', mockProgExercise);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
