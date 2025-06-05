import {TestBed} from '@angular/core/testing';

import {RoleService} from './role.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
