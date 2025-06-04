import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';
import {BackGuard} from "./back.guard";

describe('backGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => BackGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
