import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseCardComponent} from './prog-exercise-card.component';
import {provideRouter} from "@angular/router";
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../utils/testFunctions";
import {User} from "../../../../shared/model/dto/user";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";

describe('ProgExerciseCardComponent', () => {
  let component: ProgExerciseCardComponent;
  let fixture: ComponentFixture<ProgExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [ProgExerciseCardComponent],
    })
      .compileComponents();

    const userMock: User = generateTestUser();
    const exerciseMock: Exercise = generateTestExercise();
    const mockProgExercise: ProgExercise = generateTestProgExercise(userMock, exerciseMock);

    fixture = TestBed.createComponent(ProgExerciseCardComponent);
    component = fixture.componentInstance;

    component.progExercise = mockProgExercise
    fixture.detectChanges();
  });

  it('should create', () => {

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
