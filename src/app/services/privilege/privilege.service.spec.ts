import {TestBed} from '@angular/core/testing';

import {PrivilegeService} from './privilege.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ApolloTestingModule} from "apollo-angular/testing";

describe('PrivilegeService', () => {
  let service: PrivilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(PrivilegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
