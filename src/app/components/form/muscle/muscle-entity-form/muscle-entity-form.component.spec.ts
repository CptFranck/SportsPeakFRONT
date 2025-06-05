import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleEntityFormComponent} from './muscle-entity-form.component';
import {ExerciseService} from "../../../../core/services/exercise/exercise.service";
import {BehaviorSubject} from "rxjs";
import {Exercise} from "../../../../shared/model/dto/exercise";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MuscleEntityFormComponent', () => {
  let component: MuscleEntityFormComponent;
  let fixture: ComponentFixture<MuscleEntityFormComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['allMuscle', 'loading']);
  mockMuscleService.allMuscle.and.returnValues(new BehaviorSubject<Muscle[]>([]));
  mockMuscleService.loading.and.returnValues(new BehaviorSubject<boolean>(true));

  let mockExerciseService: jasmine.SpyObj<ExerciseService> =
    jasmine.createSpyObj('ExerciseService', ['exercises', 'isLoading']);
  mockExerciseService.exercises = new BehaviorSubject<Exercise[]>([]);
  mockExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: ExerciseService, useValue: mockExerciseService}
      ],
      imports: [MuscleEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleEntityFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('muscle', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
