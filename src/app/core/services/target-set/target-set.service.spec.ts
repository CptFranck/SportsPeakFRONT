import {TestBed} from '@angular/core/testing';

import {TargetSetService} from './target-set.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('TargetSetService', () => {
  let service: TargetSetService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [ApolloTestingModule],
      }
    );
    service = TestBed.inject(TargetSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
