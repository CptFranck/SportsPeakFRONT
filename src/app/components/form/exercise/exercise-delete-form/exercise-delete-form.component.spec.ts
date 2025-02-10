import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseDeleteFormComponent} from './exercise-delete-form.component';
import {ExerciseService} from "../../../../services/exercise/exercise.service";

describe('ExerciseDeleteFormComponent', () => {
  let component: ExerciseDeleteFormComponent;
  let fixture: ComponentFixture<ExerciseDeleteFormComponent>;
  let mockExerciseService: jasmine.SpyObj<ExerciseService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: ExerciseService, useValue: mockExerciseService}],
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
