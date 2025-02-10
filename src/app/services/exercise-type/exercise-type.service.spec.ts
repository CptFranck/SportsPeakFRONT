import {TestBed} from '@angular/core/testing';

import {ExerciseTypeService} from './exercise-type.service';
import {ApolloTestingModule} from "apollo-angular/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ExerciseTypeService', () => {
  let service: ExerciseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(ExerciseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
