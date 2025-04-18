import {TestBed} from '@angular/core/testing';

import {ApolloWrapperService} from './apollo-wrapper.service';

describe('ApolloWrapperService', () => {
  let service: ApolloWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApolloWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
