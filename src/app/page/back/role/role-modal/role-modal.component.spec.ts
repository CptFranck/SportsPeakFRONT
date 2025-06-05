import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleModalComponent} from './role-modal.component';
import {ActionEnum} from "../../../../shared/model/enum/action.enum";
import {RoleService} from "../../../../core/services/role/role.service";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {BehaviorSubject} from "rxjs";
import {Privilege} from "../../../../shared/model/dto/privilege";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('RoleModalComponent', () => {
  let component: RoleModalComponent;
  let fixture: ComponentFixture<RoleModalComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['addRole', 'modifyRole']);
  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService> =
    jasmine.createSpyObj('UserLoggedService', ['currentUser']);
  mockPrivilegeService.privileges = new BehaviorSubject<Privilege[]>([]);
  mockPrivilegeService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: RoleService, useValue: mockRoleService},
        {provide: PrivilegeService, useValue: mockPrivilegeService},
      ],
      imports: [RoleModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "Title");
    fixture.componentRef.setInput('roleModalId', "Id");
    fixture.componentRef.setInput('action', ActionEnum.create);
    fixture.componentRef.setInput('role', undefined)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
