import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersManagementModalComponent} from './users-management-modal.component';

describe('UserModalComponent', () => {
  let component: UsersManagementModalComponent;
  let fixture: ComponentFixture<UsersManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagementModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
