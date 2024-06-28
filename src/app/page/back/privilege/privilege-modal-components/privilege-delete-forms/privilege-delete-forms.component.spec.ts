import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeDeleteFormsComponent } from './privilege-delete-forms.component';

describe('PrivilegeDeleteFormsComponent', () => {
  let component: PrivilegeDeleteFormsComponent;
  let fixture: ComponentFixture<PrivilegeDeleteFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeDeleteFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilegeDeleteFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
