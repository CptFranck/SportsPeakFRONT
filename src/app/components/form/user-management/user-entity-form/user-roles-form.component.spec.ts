import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserRolesFormComponent} from './user-roles-form.component';
import {UserService} from "../../../../services/user/user.service";
import {BehaviorSubject} from "rxjs";
import {RoleService} from "../../../../services/role/role.service";
import {Role} from "../../../../interface/dto/role";

describe('UserRolesFormComponent', () => {
  let component: UserRolesFormComponent;
  let fixture: ComponentFixture<UserRolesFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;

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
      imports: [UserRolesFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
