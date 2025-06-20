import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserRolesFormComponent} from './user-roles-form.component';
import {of} from "rxjs";
import {RoleService} from "../../../../../core/services/role/role.service";
import {UserService} from "../../../../../core/services/user/user.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('UserRolesFormComponent', () => {
  let component: UserRolesFormComponent;
  let fixture: ComponentFixture<UserRolesFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['modifyUserRoles']);

  const mockRoleService = {
    isLoading$: of(true),
    roleList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: UserService, useValue: mockUserService},
        {provide: RoleService, useValue: mockRoleService},
      ],
      imports: [UserRolesFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRolesFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('user', undefined);
    fixture.componentRef.setInput('submitEvents', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
