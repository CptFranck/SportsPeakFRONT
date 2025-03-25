import {TestBed} from '@angular/core/testing';

import {PrivilegeService} from './privilege.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {ApolloTestingModule} from "apollo-angular/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PrivilegeService', () => {
  let service: PrivilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ApolloTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(PrivilegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
