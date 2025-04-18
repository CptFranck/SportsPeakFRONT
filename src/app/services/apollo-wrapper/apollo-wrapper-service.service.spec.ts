import { TestBed } from '@angular/core/testing';

import { ApolloWrapperServiceService } from './apollo-wrapper-service.service';

describe('ApolloWrapperServiceService', () => {
  let service: ApolloWrapperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApolloWrapperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
