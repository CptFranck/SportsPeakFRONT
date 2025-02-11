import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarLoginComponent} from './nav-bar-login.component';
import {AuthService} from "../../../services/auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {provideRouter} from "@angular/router";

describe('NavBarLoginComponent', () => {
  let component: NavBarLoginComponent;
  let fixture: ComponentFixture<NavBarLoginComponent>;

  let mockAuthService: jasmine.SpyObj<AuthService> =
    jasmine.createSpyObj('AuthService', ['isAuthenticated']);
  mockAuthService.isAuthenticated = new BehaviorSubject<boolean>(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        provideRouter([])
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
