import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleExercisesTableComponent} from './muscle-exercises-table.component';
import {generateTestMuscle} from "../../../../utils/testFunctions";

describe('MuscleExercisesTableComponent', () => {
  let component: MuscleExercisesTableComponent;
  let fixture: ComponentFixture<MuscleExercisesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleExercisesTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleExercisesTableComponent);
    component = fixture.componentInstance;

    const muscle = generateTestMuscle();
    fixture.componentRef.setInput('muscle', muscle);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
