import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgExerciseModalComponent } from './prog-exercise-modal.component';

describe('ProgExerciseModalComponent', () => {
  let component: ProgExerciseModalComponent;
  let fixture: ComponentFixture<ProgExerciseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExerciseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgExerciseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
