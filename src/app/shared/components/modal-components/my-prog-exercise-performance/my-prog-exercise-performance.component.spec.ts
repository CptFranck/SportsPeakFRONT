import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyProgExercisePerformanceComponent} from './my-prog-exercise-performance.component';
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../utils/testFunctions";
import {User} from "../../../model/dto/user";
import {Exercise} from "../../../model/dto/exercise";

describe('MyProgExercisePerformanceComponent', () => {
  let component: MyProgExercisePerformanceComponent;
  let fixture: ComponentFixture<MyProgExercisePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProgExercisePerformanceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyProgExercisePerformanceComponent);
    component = fixture.componentInstance;

    let mockUser: User = generateTestUser();
    let mockExercise: Exercise = generateTestExercise();
    fixture.componentRef.setInput('progExercise', generateTestProgExercise(mockUser, mockExercise))

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
