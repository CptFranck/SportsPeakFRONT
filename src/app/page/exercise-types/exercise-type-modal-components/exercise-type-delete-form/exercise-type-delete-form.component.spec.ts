import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypeDeleteFormComponent } from './exercise-type-delete-form.component';

describe('ExerciseTypeDeleteFormComponent', () => {
  let component: ExerciseTypeDeleteFormComponent;
  let fixture: ComponentFixture<ExerciseTypeDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypeDeleteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseTypeDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
