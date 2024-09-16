import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypeEntityFormComponent } from './exercise-type-entity-form.component';

describe('ExerciseTypeEntityFormComponent', () => {
  let component: ExerciseTypeEntityFormComponent;
  let fixture: ComponentFixture<ExerciseTypeEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypeEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseTypeEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
