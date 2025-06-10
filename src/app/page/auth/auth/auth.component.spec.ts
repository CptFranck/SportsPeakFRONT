import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {AuthService} from "../../../core/services/auth/auth.service";

describe('LoginComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  let mockAuthService = {}

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
