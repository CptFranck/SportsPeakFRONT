import {TestBed} from '@angular/core/testing';

import {MuscleService} from './muscle.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MuscleService', () => {
  let service: MuscleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ApolloTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(MuscleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
