import { TestBed } from '@angular/core/testing';

import { ProgExerciseService } from './prog-exercise.service';

describe('ProgExerciseService', () => {
  let service: ProgExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
