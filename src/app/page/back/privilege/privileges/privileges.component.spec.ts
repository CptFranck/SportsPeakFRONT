import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegesComponent} from './privileges.component';
import {of} from "rxjs";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {RoleService} from "../../../../core/services/role/role.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";

describe('PrivilegesComponent', () => {
  let component: PrivilegesComponent;
  let fixture: ComponentFixture<PrivilegesComponent>;

  const mockPrivilegeService = {
    isLoading$: of(true),
    privilegeList$: of([]),
  };

  const mockRoleService = {
    isLoading$: of(true),
    roleList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        provideRouter([]),
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
