import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleEntityFormComponent} from './role-entity-form.component';
import {of} from "rxjs";
import {UserLoggedService} from "../../../../core/services/user-logged/user-logged.service";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {RoleService} from "../../../../core/services/role/role.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('RoleEntityFormComponent', () => {
  let component: RoleEntityFormComponent;
  let fixture: ComponentFixture<RoleEntityFormComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['addRole', 'modifyRole']);

  const mockUserLoggedService = {
    currentUser$: of(undefined),
  };

  const mockPrivilegeService = {
    isLoading$: of(true),
    privilegeList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: RoleService, useValue: mockRoleService},
        {provide: PrivilegeService, useValue: mockPrivilegeService},
        {provide: UserLoggedService, useValue: mockUserLoggedService},
      ],
      imports: [RoleEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleEntityFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('role', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
