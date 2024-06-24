import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntityFormComponent } from './user-entity-form.component';

describe('UserEntityFormComponent', () => {
  let component: UserEntityFormComponent;
  let fixture: ComponentFixture<UserEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
