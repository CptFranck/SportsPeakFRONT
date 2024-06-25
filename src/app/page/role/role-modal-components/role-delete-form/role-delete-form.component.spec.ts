import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDeleteFormComponent } from './role-delete-form.component';

describe('RoleDeleteFormComponent', () => {
  let component: RoleDeleteFormComponent;
  let fixture: ComponentFixture<RoleDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDeleteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
