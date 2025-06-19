import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersManagementModalComponent} from './users-management-modal.component';
import {ActionType} from "../../../../shared/model/enum/action-type";
import {generateTestUser} from "../../../../utils/testFunctions";
import {UserService} from "../../../../core/services/user/user.service";
import {RoleService} from "../../../../core/services/role/role.service";
import {of} from "rxjs";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('UsersManagementModalComponent', () => {
  let component: UsersManagementModalComponent;
  let fixture: ComponentFixture<UsersManagementModalComponent>;

  const mockRoleService = {
    isLoading$: of(true),
    roleList$: of([]),
  };

  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['deleteUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagementModalComponent],
      providers: [
        provideAnimations(),
        {provide: UserService, useValue: mockUserService},
        {provide: RoleService, useValue: mockRoleService},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersManagementModalComponent);
    component = fixture.componentInstance;

    const user = generateTestUser();
    fixture.componentRef.setInput('user', user);
    fixture.componentRef.setInput('modalTitle', "Title");
    fixture.componentRef.setInput('userModalId', "Id");
    fixture.componentRef.setInput('action', ActionType.create);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
