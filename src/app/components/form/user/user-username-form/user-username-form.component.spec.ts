import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserUsernameFormComponent} from './user-username-form.component';
import {UserService} from "../../../../services/user/user.service";

describe('UsernameFormComponent', () => {
  let component: UserUsernameFormComponent;
  let fixture: ComponentFixture<UserUsernameFormComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: UserService, useValue: mockUserService}],
      imports: [UserUsernameFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
