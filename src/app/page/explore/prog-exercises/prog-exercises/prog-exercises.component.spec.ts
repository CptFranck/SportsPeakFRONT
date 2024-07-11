import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgExercisesComponent } from './prog-exercises.component';

describe('ProgExercisesComponent', () => {
  let component: ProgExercisesComponent;
  let fixture: ComponentFixture<ProgExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExercisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
