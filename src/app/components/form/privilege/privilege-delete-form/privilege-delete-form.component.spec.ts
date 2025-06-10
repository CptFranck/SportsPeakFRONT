import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeDeleteFormComponent} from './privilege-delete-form.component';
import {PrivilegeService} from "../../../../core/services/privilege/privilege.service";
import {of} from "rxjs";

describe('PrivilegeDeleteFormComponent', () => {
  let component: PrivilegeDeleteFormComponent;
  let fixture: ComponentFixture<PrivilegeDeleteFormComponent>;

  const mockPrivilegeService = {
    isLoading$: of(true),
    privilegeList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: PrivilegeService, useValue: mockPrivilegeService},
      ],
      imports: [PrivilegeDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeDeleteFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('privilege', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
