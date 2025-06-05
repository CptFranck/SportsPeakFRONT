import {TestBed} from '@angular/core/testing';

import {IllustrationService} from './illustration.service';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('IllustrationService', () => {
  let service: IllustrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(IllustrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
