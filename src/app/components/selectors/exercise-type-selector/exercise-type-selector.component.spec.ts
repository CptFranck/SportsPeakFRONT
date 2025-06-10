import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseTypeSelectorComponent} from './exercise-type-selector.component';
import {of} from "rxjs";
import {ExerciseTypeService} from "../../../core/services/exercise-type/exercise-type.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('ExerciseTypeSelectorComponent', () => {
  let component: ExerciseTypeSelectorComponent;
  let fixture: ComponentFixture<ExerciseTypeSelectorComponent>;

  const mockExerciseTypeService = {
    isLoading$: of(true),
    exerciseTypeList$: of([]),
    selectedExerciseType$: of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: ExerciseTypeService, useValue: mockExerciseTypeService}
      ],
      imports: [ExerciseTypeSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExerciseTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
