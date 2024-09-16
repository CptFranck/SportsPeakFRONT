import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypeDetailsDisplayComponent } from './exercise-type-details-display.component';

describe('ExerciseTypeDetailsDisplayComponent', () => {
  let component: ExerciseTypeDetailsDisplayComponent;
  let fixture: ComponentFixture<ExerciseTypeDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypeDetailsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseTypeDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
