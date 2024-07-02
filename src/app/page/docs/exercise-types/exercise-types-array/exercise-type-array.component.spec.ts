import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypeArrayComponent } from './exercise-type-array.component';

describe('ExerciseTypeArrayComponent', () => {
  let component: ExerciseTypeArrayComponent;
  let fixture: ComponentFixture<ExerciseTypeArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypeArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseTypeArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
