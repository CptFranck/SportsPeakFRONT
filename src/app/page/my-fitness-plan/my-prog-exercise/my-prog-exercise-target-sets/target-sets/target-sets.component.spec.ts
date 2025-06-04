import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetsComponent} from './target-sets.component';
import {User} from "../../../../../shared/model/dto/user";
import {generateTestExercise, generateTestProgExercise, generateTestUser} from "../../../../../utils/testFunctions";
import {Exercise} from "../../../../../shared/model/dto/exercise";

describe('TargetSetsComponent', () => {
  let component: TargetSetsComponent;
  let fixture: ComponentFixture<TargetSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetsComponent);
    component = fixture.componentInstance;

    let mockUser: User = generateTestUser();
    let mockExercise: Exercise = generateTestExercise();
    fixture.componentRef.setInput('progExercise', generateTestProgExercise(mockUser, mockExercise))
    fixture.componentRef.setInput('targetSetModalId', "Title");
    fixture.componentRef.setInput('performanceLogModalId', "Id");

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
