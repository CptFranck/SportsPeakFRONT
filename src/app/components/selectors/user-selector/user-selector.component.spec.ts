import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSelectorComponent} from './user-selector.component';
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../interface/dto/user";

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;
  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['users', 'isLoading']);
  mockUserService.users = new BehaviorSubject<User[]>([]);
  mockUserService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: UserService, useValue: mockUserService}],
      imports: [UserSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
