import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEntityFormComponent } from './role-entity-form.component';

describe('RoleEntityFormComponent', () => {
  let component: RoleEntityFormComponent;
  let fixture: ComponentFixture<RoleEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
