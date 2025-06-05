import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterFormComponent} from './register-form.component';
import {AuthService} from "../../../../core/services/auth/auth.service";

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService> =
    jasmine.createSpyObj('AuthService', ['register']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: AuthService, useValue: mockAuthService}],
      imports: [RegisterFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
