import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserNameFormComponent} from './user-name-form.component';
import {UserService} from "../../../../core/services/user/user.service";

describe('UserNameFormComponent', () => {
  let component: UserNameFormComponent;
  let fixture: ComponentFixture<UserNameFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService}
      ],
      imports: [UserNameFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
