import {TestBed} from '@angular/core/testing';

import {ProgExerciseService} from './prog-exercise.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProgExerciseService', () => {
  let service: ProgExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ApolloTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ProgExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
