import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
