import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersManagementComponent} from './users-management.component';
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../interface/dto/user";
import {RoleService} from "../../../../services/role/role.service";
import {Role} from "../../../../interface/dto/role";

describe('UsersComponent', () => {
  let component: UsersManagementComponent;
  let fixture: ComponentFixture<UsersManagementComponent>;

  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['users', 'isLoading']);
  mockUserService.users = new BehaviorSubject<User[]>([]);
  mockUserService.isLoading = new BehaviorSubject<boolean>(true);

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['roles', 'isLoading']);
  mockRoleService.roles = new BehaviorSubject<Role[]>([]);
  mockRoleService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: RoleService, useValue: mockRoleService},
      ],
      imports: [UsersManagementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
