import { TestBed } from '@angular/core/testing';

import { TargetSetService } from './target-set.service';

describe('TargetSetService', () => {
  let service: TargetSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
