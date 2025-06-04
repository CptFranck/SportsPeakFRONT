import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExercisesComponent} from './prog-exercises.component';
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {BehaviorSubject} from "rxjs";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('ProgExercisesComponent', () => {
  let component: ProgExercisesComponent;
  let fixture: ComponentFixture<ProgExercisesComponent>;
  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService> =
    jasmine.createSpyObj('ProgExerciseService', ['progExercises', 'isLoading']);
  mockProgExerciseService.progExercises = new BehaviorSubject<ProgExercise[]>([]);
  mockProgExerciseService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: ProgExerciseService, useValue: mockProgExerciseService}
      ],
      imports: [ProgExercisesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
