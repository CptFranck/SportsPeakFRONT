import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetailsDisplayComponent } from './exercise-details-display.component';

describe('ExerciseDetailsDisplayComponent', () => {
  let component: ExerciseDetailsDisplayComponent;
  let fixture: ComponentFixture<ExerciseDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDetailsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
