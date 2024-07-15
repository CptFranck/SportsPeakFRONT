import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgExerciseCardComponent } from './prog-exercise-card.component';

describe('ProgExerciseCardComponent', () => {
  let component: ProgExerciseCardComponent;
  let fixture: ComponentFixture<ProgExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExerciseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
