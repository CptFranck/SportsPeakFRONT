import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleSelectorComponent} from './role-selector.component';
import {RoleService} from "../../../../core/services/role/role.service";
import {of} from "rxjs";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('RoleSelectorComponent', () => {
  let component: RoleSelectorComponent;
  let fixture: ComponentFixture<RoleSelectorComponent>;

  const mockRoleService = {
    isLoading$: of(true),
    roleList$: of([]),
  };

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
