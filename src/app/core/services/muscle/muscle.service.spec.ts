import {TestBed} from '@angular/core/testing';

import {MuscleService} from './muscle.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('MuscleService', () => {
  let service: MuscleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(MuscleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
