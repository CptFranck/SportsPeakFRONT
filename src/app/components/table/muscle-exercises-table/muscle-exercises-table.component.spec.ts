import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleExercisesTableComponent } from './muscle-exercises-table.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
