import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleDeleteFormComponent} from './role-delete-form.component';
import {RoleService} from "../../../../../core/services/role/role.service";

describe('RoleDeleteFormComponent', () => {
  let component: RoleDeleteFormComponent;
  let fixture: ComponentFixture<RoleDeleteFormComponent>;

  let mockRoleService: jasmine.SpyObj<RoleService> =
    jasmine.createSpyObj('RoleService', ['deleteRole']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: RoleService, useValue: mockRoleService}],
      imports: [RoleDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleDeleteFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('role', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
