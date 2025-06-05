import {TestBed} from '@angular/core/testing';

import {ExerciseService} from './exercise.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(ExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
