import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypeCardComponent } from './exercise-type-card.component';

describe('ExerciseTypeCardComponent', () => {
  let component: ExerciseTypeCardComponent;
  let fixture: ComponentFixture<ExerciseTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
