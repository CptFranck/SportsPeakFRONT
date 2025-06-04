import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExercisesArrayComponent} from './prog-exercises-array.component';
import {User} from "../../../../shared/model/dto/user";
import {generateTestExercise, generateTestUser} from "../../../../utils/testFunctions";
import {Exercise} from "../../../../shared/model/dto/exercise";

describe('ProgExercisesArrayComponent', () => {
  let component: ProgExercisesArrayComponent;
  let fixture: ComponentFixture<ProgExercisesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExercisesArrayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExercisesArrayComponent);
    component = fixture.componentInstance;

    const userMock: User = generateTestUser();
    const exerciseMock: Exercise = generateTestExercise();
    fixture.componentRef.setInput('modalId', "Id");
    fixture.componentRef.setInput('progExercises', [])

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
