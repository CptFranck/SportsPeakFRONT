import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEntityFormComponent } from './exercise-entity-form.component';

describe('ExerciseEntityFormComponent', () => {
  let component: ExerciseEntityFormComponent;
  let fixture: ComponentFixture<ExerciseEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
