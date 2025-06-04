import {TestBed} from '@angular/core/testing';

import {ExerciseTypeService} from './exercise-type.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ExerciseTypeService', () => {
  let service: ExerciseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ApolloTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ExerciseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
