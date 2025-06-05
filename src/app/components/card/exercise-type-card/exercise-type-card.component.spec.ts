import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypeCardComponent} from './exercise-type-card.component';
import {provideRouter} from "@angular/router";
import {generateTestExerciseType} from "../../../utils/testFunctions";

describe('ExerciseTypeCardComponent', () => {
  let component: ExerciseTypeCardComponent;
  let fixture: ComponentFixture<ExerciseTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
      ],
      imports: [ExerciseTypeCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypeCardComponent);
    component = fixture.componentInstance;

    const exerciseType = generateTestExerciseType();
    fixture.componentRef.setInput('exerciseType', exerciseType);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
