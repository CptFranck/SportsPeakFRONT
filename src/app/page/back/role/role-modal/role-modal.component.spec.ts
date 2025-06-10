import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleModalComponent} from './role-modal.component';
import {ActionType} from "../../../../shared/model/enum/action-type";
import {RoleService} from "../../../../core/services/role/role.service";
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {of} from "rxjs";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('RoleModalComponent', () => {
  let component: RoleModalComponent;
  let fixture: ComponentFixture<RoleModalComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['addRole', 'modifyRole']);

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
      imports: [RoleModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "Title");
    fixture.componentRef.setInput('roleModalId', "Id");
    fixture.componentRef.setInput('action', ActionType.create);
    fixture.componentRef.setInput('role', undefined)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
