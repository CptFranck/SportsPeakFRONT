import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgExerciseCardDetailsComponent } from './prog-exercise-card-details.component';

describe('ProgExerciseCardDetailsComponent', () => {
  let component: ProgExerciseCardDetailsComponent;
  let fixture: ComponentFixture<ProgExerciseCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExerciseCardDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgExerciseCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
