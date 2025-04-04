import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeEntityFormComponent} from './privilege-entity-form.component';
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {BehaviorSubject} from "rxjs";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {User} from "../../../../interface/dto/user";
import {RoleService} from "../../../../services/role/role.service";
import {Role} from "../../../../interface/dto/role";

describe('PrivilegeEntityFormComponent', () => {
  let component: PrivilegeEntityFormComponent;
  let fixture: ComponentFixture<PrivilegeEntityFormComponent>;

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['roles', 'isLoading']);
  mockRoleService.roles = new BehaviorSubject<Role[]>([]);
  mockRoleService.isLoading = new BehaviorSubject<boolean>(true);

  let mockUserLoggedService: jasmine.SpyObj<UserLoggedService> =
    jasmine.createSpyObj('PrivilegeService', ['currentUser']);
  mockUserLoggedService.currentUser = new BehaviorSubject<User | undefined>(undefined);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: RoleService, useValue: mockRoleService},
        {provide: PrivilegeService, useValue: mockPrivilegeService},
        {provide: UserLoggedService, useValue: mockUserLoggedService},
      ],
      imports: [PrivilegeEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
