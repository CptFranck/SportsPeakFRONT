import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciceCardComponent} from './exercice-card.component';
import {provideRouter} from "@angular/router";
import {generateTestExercise} from "../../../../utils/testFunctions";

describe('ExerciceCardComponent', () => {
  let component: ExerciceCardComponent;
  let fixture: ComponentFixture<ExerciceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciceCardComponent],
      providers: [provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciceCardComponent);
    component = fixture.componentInstance;

    const exercise = generateTestExercise();
    fixture.componentRef.setInput('exercise', exercise);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
