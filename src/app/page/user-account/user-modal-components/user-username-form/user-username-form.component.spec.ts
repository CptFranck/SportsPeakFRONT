import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserUsernameFormComponent} from './user-username-form.component';

describe('UsernameFormComponent', () => {
  let component: UserUsernameFormComponent;
  let fixture: ComponentFixture<UserUsernameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUsernameFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
