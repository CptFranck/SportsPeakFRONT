import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
