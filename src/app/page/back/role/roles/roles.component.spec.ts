import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RolesComponent} from './roles.component';
import {BehaviorSubject, of} from "rxjs";
import {RoleService} from "../../../../core/services/role/role.service";
import {Role} from "../../../../shared/model/dto/role";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['roles', 'isLoading']);
  mockRoleService.roles = new BehaviorSubject<Role[]>([]);
  mockRoleService.isLoading = new BehaviorSubject<boolean>(true);

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
      ],
      imports: [RolesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
