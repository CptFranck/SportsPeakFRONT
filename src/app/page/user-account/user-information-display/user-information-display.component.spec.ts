import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationDisplayComponent } from './user-information-display.component';

describe('UserInformationDisplayComponent', () => {
  let component: UserInformationDisplayComponent;
  let fixture: ComponentFixture<UserInformationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInformationDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInformationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
