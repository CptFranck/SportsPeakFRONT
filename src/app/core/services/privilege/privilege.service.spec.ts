import {TestBed} from '@angular/core/testing';

import {PrivilegeService} from './privilege.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('PrivilegeService', () => {
  let service: PrivilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(PrivilegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
