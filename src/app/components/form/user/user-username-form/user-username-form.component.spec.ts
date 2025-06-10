import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserUsernameFormComponent} from './user-username-form.component';
import {UserService} from "../../../../core/services/user/user.service";
import {ModificationFieldEnum} from "../../../../shared/model/enum/user-modification-field";

describe('UserUsernameFormComponent', () => {
  let component: UserUsernameFormComponent;
  let fixture: ComponentFixture<UserUsernameFormComponent>;

  let mockUserService: jasmine.SpyObj<UserService> =
    jasmine.createSpyObj('UserService', ['modifyUserUsername']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService}
      ],
      imports: [UserUsernameFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserUsernameFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('user', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);
    fixture.componentRef.setInput('modification', ModificationFieldEnum.username);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
