import {TestBed} from '@angular/core/testing';

import {PerformanceLogService} from './performance-log.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PerformanceLogService', () => {
  let service: PerformanceLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ApolloTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(PerformanceLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
