import {TestBed} from '@angular/core/testing';

import {TargetSetService} from './target-set.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TargetSetService', () => {
  let service: TargetSetService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
    imports: [ApolloTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}
    );
    service = TestBed.inject(TargetSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
