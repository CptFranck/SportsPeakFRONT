import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSelectorComponent} from './user-selector.component';
import {of} from "rxjs";
import {UserService} from "../../../core/services/user/user.service";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

  const mockUserService = {
    isLoading$: of(true),
    userList$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        {provide: UserService, useValue: mockUserService}],
      imports: [UserSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
