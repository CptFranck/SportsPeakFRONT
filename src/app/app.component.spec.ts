import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideRouter} from "@angular/router";
import {AuthService} from "./core/services/auth/auth.service";

describe('AppComponent', () => {
  const mockAuthService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        provideRouter([])
      ],
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'SportsPeak' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SportsPeak');
  });

});
