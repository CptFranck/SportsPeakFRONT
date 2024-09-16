import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeEntityFormComponent } from './privilege-entity-form.component';

describe('PrivilegeEntityFormComponent', () => {
  let component: PrivilegeEntityFormComponent;
  let fixture: ComponentFixture<PrivilegeEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilegeEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
