import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {AuthService} from "../../../core/services/auth/auth.service";
import {BehaviorSubject} from "rxjs";

describe('LoginComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  let mockAuthService: jasmine.SpyObj<AuthService> =
    jasmine.createSpyObj('AuthService', ['isAuthenticated']);
  mockAuthService.isAuthenticated = new BehaviorSubject<boolean>(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ],
      imports: [AuthComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
