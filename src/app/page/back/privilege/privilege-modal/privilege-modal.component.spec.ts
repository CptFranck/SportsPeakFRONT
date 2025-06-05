import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeModalComponent} from './privilege-modal.component';
import {ActionEnum} from "../../../../shared/model/enum/action.enum";

describe('PrivilegeModalComponent', () => {
  let component: PrivilegeModalComponent;
  let fixture: ComponentFixture<PrivilegeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "title");
    fixture.componentRef.setInput('privilegeModalId', "Id");
    fixture.componentRef.setInput('privilege', undefined);
    fixture.componentRef.setInput('action', ActionEnum.read);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
