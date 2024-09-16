import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameFormComponent } from './user-name-form.component';

describe('UserNameFormComponent', () => {
  let component: UserNameFormComponent;
  let fixture: ComponentFixture<UserNameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNameFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
