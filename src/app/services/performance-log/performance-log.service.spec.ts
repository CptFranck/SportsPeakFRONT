import { TestBed } from '@angular/core/testing';

import { PerformanceLogService } from './performance-log.service';

describe('PerformanceLogServiceService', () => {
  let service: PerformanceLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
