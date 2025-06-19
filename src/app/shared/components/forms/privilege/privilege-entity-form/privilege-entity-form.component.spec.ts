import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeEntityFormComponent} from './privilege-entity-form.component';
import {PrivilegeService} from "../../../../../core/services/privilege/privilege.service";
import {of} from "rxjs";
import {CurrentUserService} from "../../../../../core/services/current-user/current-user.service";
import {RoleService} from "../../../../../core/services/role/role.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('PrivilegeEntityFormComponent', () => {
  let component: PrivilegeEntityFormComponent;
  let fixture: ComponentFixture<PrivilegeEntityFormComponent>;

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService> =
    jasmine.createSpyObj('PrivilegeService', ['addPrivilege', 'modifyPrivilege']);

  const mockRoleService = {
    isLoading$: of(true),
    roleList$: of([]),
  };

  const mockUserLoggedService = {
    currentUser$: of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: RoleService, useValue: mockRoleService},
        {provide: PrivilegeService, useValue: mockPrivilegeService},
        {provide: CurrentUserService, useValue: mockUserLoggedService},
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
