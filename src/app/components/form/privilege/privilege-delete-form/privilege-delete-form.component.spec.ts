import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeDeleteFormComponent} from './privilege-delete-form.component';
import {PrivilegeService} from "../../../../services/privilege/privilege.service";

describe('PrivilegeDeleteFormsComponent', () => {
  let component: PrivilegeDeleteFormComponent;
  let fixture: ComponentFixture<PrivilegeDeleteFormComponent>;

  let mockPrivilegeService: jasmine.SpyObj<PrivilegeService>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
