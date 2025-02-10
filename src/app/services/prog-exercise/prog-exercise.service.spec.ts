import {TestBed} from '@angular/core/testing';

import {ProgExerciseService} from './prog-exercise.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProgExerciseService', () => {
  let service: ProgExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(ProgExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
