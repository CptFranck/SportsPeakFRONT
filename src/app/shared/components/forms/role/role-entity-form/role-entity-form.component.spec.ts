import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleEntityFormComponent} from './role-entity-form.component';
import {of} from "rxjs";
import {CurrentUserService} from "../../../../../core/services/current-user/current-user.service";
import {PrivilegeService} from "../../../../../core/services/privilege/privilege.service";
import {RoleService} from "../../../../../core/services/role/role.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('RoleEntityFormComponent', () => {
  let component: RoleEntityFormComponent;
  let fixture: ComponentFixture<RoleEntityFormComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['addRole', 'modifyRole']);

  const mockCurrentUserService = {
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
        {provide: CurrentUserService, useValue: mockCurrentUserService},
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
