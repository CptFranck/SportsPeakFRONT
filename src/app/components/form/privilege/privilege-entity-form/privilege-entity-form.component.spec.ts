import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeEntityFormComponent} from './privilege-entity-form.component';
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {BehaviorSubject} from "rxjs";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {User} from "../../../../shared/model/dto/user";
import {RoleService} from "../../../../core/services/role/role.service";
import {Role} from "../../../../shared/model/dto/role";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('PrivilegeEntityFormComponent', () => {
  let component: PrivilegeEntityFormComponent;
  let fixture: ComponentFixture<PrivilegeEntityFormComponent>;

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService> =
    jasmine.createSpyObj('PrivilegeService', ['addPrivilege', 'modifyPrivilege']);

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['']);
  mockRoleService.roles = new BehaviorSubject<Role[]>([]);
  mockRoleService.isLoading = new BehaviorSubject<boolean>(true);

  let mockUserLoggedService: jasmine.SpyObj<UserLoggedService> =
    jasmine.createSpyObj('PrivilegeService', ['']);
  mockUserLoggedService.currentUser = new BehaviorSubject<User | undefined>(undefined);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: RoleService, useValue: mockRoleService},
        {provide: PrivilegeService, useValue: mockPrivilegeService},
        {provide: UserLoggedService, useValue: mockUserLoggedService},
      ],
      imports: [PrivilegeEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeEntityFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('privilege', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
