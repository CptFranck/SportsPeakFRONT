import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersManagementComponent} from './users-management.component';
import {of} from "rxjs";
import {UserService} from "../../../../core/services/user/user.service";
import {RoleService} from "../../../../core/services/role/role.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('UsersManagementComponent', () => {
  let component: UsersManagementComponent;
  let fixture: ComponentFixture<UsersManagementComponent>;

  const mockUserService = {
    isLoading$: of(true),
    userList$: of([]),
  };

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
