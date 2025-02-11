import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleSelectorComponent} from './role-selector.component';
import {RoleService} from "../../../services/role/role.service";
import {BehaviorSubject} from "rxjs";
import {Role} from "../../../interface/dto/role";

describe('RoleSelectorComponent', () => {
  let component: RoleSelectorComponent;
  let fixture: ComponentFixture<RoleSelectorComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['roles', 'isLoading']);
  mockRoleService.roles = new BehaviorSubject<Role[]>([]);
  mockRoleService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: RoleService, useValue: mockRoleService},
      ],
      imports: [RoleSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
