import {TestBed} from '@angular/core/testing';

import {PerformanceLogService} from './performance-log.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PerformanceLogService', () => {
  let service: PerformanceLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(PerformanceLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
