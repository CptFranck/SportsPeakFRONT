import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegesComponent} from './privileges.component';
import {BehaviorSubject} from "rxjs";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {Privilege} from "../../../../shared/model/dto/privilege";
import {RoleService} from "../../../../core/services/role/role.service";
import {Role} from "../../../../shared/model/dto/role";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('PrivilegesComponent', () => {
  let component: PrivilegesComponent;
  let fixture: ComponentFixture<PrivilegesComponent>;

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService> =
    jasmine.createSpyObj('PrivilegeService', ['privileges', 'isLoading']);
  mockPrivilegeService.privileges = new BehaviorSubject<Privilege[]>([]);
  mockPrivilegeService.isLoading = new BehaviorSubject<boolean>(true);

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['roles', 'isLoading']);
  mockRoleService.roles = new BehaviorSubject<Role[]>([]);
  mockRoleService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: RoleService, useValue: mockRoleService},
        {provide: PrivilegeService, useValue: mockPrivilegeService},
      ],
      imports: [PrivilegesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
