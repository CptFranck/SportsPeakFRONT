import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEmailFormComponent} from './user-email-form.component';
import {UserService} from "../../../../core/services/user/user.service";

describe('UserEmailFormComponent', () => {
  let component: UserEmailFormComponent;
  let fixture: ComponentFixture<UserEmailFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService},
      ],
      imports: [UserEmailFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
