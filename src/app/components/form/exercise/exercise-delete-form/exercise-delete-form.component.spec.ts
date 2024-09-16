import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDeleteFormComponent } from './exercise-delete-form.component';

describe('ExerciseDeleteFormComponent', () => {
  let component: ExerciseDeleteFormComponent;
  let fixture: ComponentFixture<ExerciseDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDeleteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
