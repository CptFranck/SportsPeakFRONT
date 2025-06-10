import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserNameFormComponent} from './user-name-form.component';
import {UserService} from "../../../../core/services/user/user.service";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field";

describe('UserNameFormComponent', () => {
  let component: UserNameFormComponent;
  let fixture: ComponentFixture<UserNameFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['modifyUserIdentity']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService}
      ],
      imports: [UserNameFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserNameFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('user', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);
    fixture.componentRef.setInput('modification', ModificationFieldEnum.email);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
