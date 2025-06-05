import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleModalComponent} from './muscle-modal.component';
import {ActionEnum} from "../../../shared/model/enum/action.enum";
import {MuscleService} from "../../../core/services/muscle/muscle.service";
import {ExerciseService} from "../../../core/services/exercise/exercise.service";
import {BehaviorSubject} from "rxjs";
import {Exercise} from "../../../shared/model/dto/exercise";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MuscleModalComponent', () => {
  let component: MuscleModalComponent;
  let fixture: ComponentFixture<MuscleModalComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['addMuscle', 'modifyMuscle', 'deleteMuscle']);

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

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
    fixture.componentRef.setInput('action', ActionEnum.create)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
