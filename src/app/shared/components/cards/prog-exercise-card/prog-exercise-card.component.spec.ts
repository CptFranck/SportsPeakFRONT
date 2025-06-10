import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseCardComponent} from './prog-exercise-card.component';
import {provideRouter} from "@angular/router";
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../utils/testFunctions";
import {User} from "../../../model/dto/user";
import {Exercise} from "../../../model/dto/exercise";

describe('ProgExerciseCardComponent', () => {
  let component: ProgExerciseCardComponent;
  let fixture: ComponentFixture<ProgExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [ProgExerciseCardComponent],
    })
      .compileComponents();


    fixture = TestBed.createComponent(ProgExerciseCardComponent);
    component = fixture.componentInstance;

    const userMock: User = generateTestUser();
    const exerciseMock: Exercise = generateTestExercise();
    fixture.componentRef.setInput('modalId', "Id");
    fixture.componentRef.setInput('progExercise', generateTestProgExercise(userMock, exerciseMock))

    fixture.detectChanges();
  });

  it('should create', () => {

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
