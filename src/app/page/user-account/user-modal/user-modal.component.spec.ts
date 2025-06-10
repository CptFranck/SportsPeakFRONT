import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserModalComponent} from './user-modal.component';
import {ActionType} from "../../../shared/model/enum/action-type";
import {ModificationFieldEnum} from "../../../shared/model/enum/user-modification-field";

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalTitle', "title");
    fixture.componentRef.setInput('userModalId', "Id");
    fixture.componentRef.setInput('user', undefined);
    fixture.componentRef.setInput('action', ActionType.read);
    fixture.componentRef.setInput('modification', ModificationFieldEnum.email);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
