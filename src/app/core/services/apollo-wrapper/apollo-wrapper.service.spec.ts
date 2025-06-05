import {TestBed} from '@angular/core/testing';

import {ApolloWrapperService} from './apollo-wrapper.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('ApolloWrapperService', () => {
  let service: ApolloWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(ApolloWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
