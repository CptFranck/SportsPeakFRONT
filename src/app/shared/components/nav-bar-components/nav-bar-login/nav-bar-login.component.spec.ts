import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarLoginComponent} from './nav-bar-login.component';
import {AuthService} from "../../../../core/services/auth/auth.service";
import {provideRouter} from "@angular/router";
import {of} from "rxjs";

describe('NavBarLoginComponent', () => {
  let component: NavBarLoginComponent;
  let fixture: ComponentFixture<NavBarLoginComponent>;

  const mockAuthService = {
    isAuthenticated$: of(false),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {provide: AuthService, useValue: mockAuthService},
      ],
      imports: [NavBarLoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavBarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
