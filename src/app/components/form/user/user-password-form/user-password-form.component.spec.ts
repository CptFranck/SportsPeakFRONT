import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPasswordFormComponent} from './user-password-form.component';
import {UserService} from "../../../../core/services/user/user.service";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field.enum";

describe('UserPasswordFormComponent', () => {
  let component: UserPasswordFormComponent;
  let fixture: ComponentFixture<UserPasswordFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['modifyUserPassword']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService}
      ],
      imports: [UserPasswordFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserPasswordFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('user', undefined);
    fixture.componentRef.setInput('modification', ModificationFieldEnum.password);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
