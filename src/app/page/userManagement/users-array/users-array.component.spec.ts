import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersArrayComponent } from './users-array.component';

describe('UsersArrayComponent', () => {
  let component: UsersArrayComponent;
  let fixture: ComponentFixture<UsersArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
