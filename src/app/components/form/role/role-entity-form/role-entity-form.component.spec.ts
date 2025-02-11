import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleEntityFormComponent} from './role-entity-form.component';
import {BehaviorSubject} from "rxjs";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";
import {User} from "../../../../interface/dto/user";
import {RoleService} from "../../../../services/role/role.service";
import {PrivilegeService} from "../../../../services/privilege/privilege.service";
import {Privilege} from "../../../../interface/dto/privilege";

describe('RoleEntityFormComponent', () => {
  let component: RoleEntityFormComponent;
  let fixture: ComponentFixture<RoleEntityFormComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService>;

  let mockUserLoggedService: jasmine.SpyObj<UserLoggedService> =
    jasmine.createSpyObj('UserLoggedService', ['currentUser']);
  mockUserLoggedService.currentUser = new BehaviorSubject<User | undefined>(undefined);

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService> =
    jasmine.createSpyObj('UserLoggedService', ['currentUser']);
  mockPrivilegeService.privileges = new BehaviorSubject<Privilege[]>([]);
  mockPrivilegeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: RoleService, useValue: mockRoleService},
        {provide: PrivilegeService, useValue: mockPrivilegeService},
        {provide: UserLoggedService, useValue: mockUserLoggedService},
      ],
      imports: [RoleEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
