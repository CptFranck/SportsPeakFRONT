import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersManagementArrayComponent} from './users-management-array.component';

describe('UsersManagementArrayComponent', () => {
  let component: UsersManagementArrayComponent;
  let fixture: ComponentFixture<UsersManagementArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagementArrayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersManagementArrayComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('users', []);
    fixture.componentRef.setInput('modalId', 'Id');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
