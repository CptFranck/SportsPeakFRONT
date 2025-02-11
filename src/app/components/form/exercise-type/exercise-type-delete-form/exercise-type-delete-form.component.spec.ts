import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypeDeleteFormComponent} from './exercise-type-delete-form.component';
import {ExerciseTypeService} from "../../../../services/exercise-type/exercise-type.service";

describe('ExerciseTypeDeleteFormComponent', () => {
  let component: ExerciseTypeDeleteFormComponent;
  let fixture: ComponentFixture<ExerciseTypeDeleteFormComponent>;

  let mockExerciseTypeService: jasmine.SpyObj<ExerciseTypeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService},
      ],
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
