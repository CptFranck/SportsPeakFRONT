import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleSelectorComponent} from './role-selector.component';
import {RoleService} from "../../../../core/services/role/role.service";
import {BehaviorSubject} from "rxjs";
import {Role} from "../../../model/dto/role";
import {provideAnimations} from "@angular/platform-browser/animations";

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
        provideAnimations(),
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
