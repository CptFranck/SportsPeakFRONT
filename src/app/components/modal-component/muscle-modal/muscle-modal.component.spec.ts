import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleModalComponent} from './muscle-modal.component';
import {ActionType} from "../../../shared/model/enum/action-type";
import {MuscleService} from "../../../core/services/muscle/muscle.service";
import {ExerciseService} from "../../../core/services/exercise/exercise.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";

describe('MuscleModalComponent', () => {
  let component: MuscleModalComponent;
  let fixture: ComponentFixture<MuscleModalComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['addMuscle', 'modifyMuscle', 'deleteMuscle']);

  const mockExerciseService = {
    isLoading$: of(true),
    exerciseList$: of([]),
    selectedExercise$: of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleModalComponent],
      providers: [
        provideAnimations(),
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: ExerciseService, useValue: mockExerciseService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "Title")
    fixture.componentRef.setInput('muscleModalId', "Id")
    fixture.componentRef.setInput('action', ActionType.create)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
