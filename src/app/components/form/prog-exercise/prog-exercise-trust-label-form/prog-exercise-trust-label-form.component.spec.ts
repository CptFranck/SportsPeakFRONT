import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseTrustLabelFormComponent} from './prog-exercise-trust-label-form.component';
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";

describe('TargetTrustLabelFormComponent', () => {
  let component: ProgExerciseTrustLabelFormComponent;
  let fixture: ComponentFixture<ProgExerciseTrustLabelFormComponent>;

  let mockProgExerciseService: jasmine.SpyObj<ProgExerciseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ProgExerciseService, useValue: mockProgExerciseService},
      ],
      imports: [ProgExerciseTrustLabelFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExerciseTrustLabelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
