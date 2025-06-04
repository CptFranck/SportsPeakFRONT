import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDeleteFormComponent} from './user-delete-form.component';
import {UserService} from "../../../../core/services/user/user.service";

describe('UserDeleteFormComponent', () => {
  let component: UserDeleteFormComponent;
  let fixture: ComponentFixture<UserDeleteFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService},
      ],
      imports: [UserDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
