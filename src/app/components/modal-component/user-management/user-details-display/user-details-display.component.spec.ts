import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsDisplayComponent } from './user-details-display.component';

describe('UserDetailsDisplayComponent', () => {
  let component: UserDetailsDisplayComponent;
  let fixture: ComponentFixture<UserDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
