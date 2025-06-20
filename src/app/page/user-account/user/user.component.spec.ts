import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserService} from "../../../core/services/user/user.service";
import {of} from "rxjs";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const mockUserService = {
    isLoading$: of(true),
    userList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: mockUserService}
      ],
      imports: [UserComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
