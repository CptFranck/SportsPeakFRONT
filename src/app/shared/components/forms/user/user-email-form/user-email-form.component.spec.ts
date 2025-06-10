import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEmailFormComponent} from './user-email-form.component';
import {UserService} from "../../../../../core/services/user/user.service";
import {ModificationFieldEnum} from "../../../../model/enum/user-modification-field";

describe('UserEmailFormComponent', () => {
  let component: UserEmailFormComponent;
  let fixture: ComponentFixture<UserEmailFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['modifyUserEmail']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService},
      ],
      imports: [UserEmailFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserEmailFormComponent);
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
