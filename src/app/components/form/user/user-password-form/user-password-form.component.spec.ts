import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPasswordFormComponent} from './user-password-form.component';
import {UserService} from "../../../../core/services/user/user.service";

describe('UserPasswordFormComponent', () => {
  let component: UserPasswordFormComponent;
  let fixture: ComponentFixture<UserPasswordFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService}
      ],
      imports: [UserPasswordFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
