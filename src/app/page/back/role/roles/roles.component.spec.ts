import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RolesComponent} from './roles.component';
import {of} from "rxjs";
import {RoleService} from "../../../../core/services/role/role.service";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  const mockRoleService = {
    isLoading$: of(true),
    roleList$: of([]),
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
