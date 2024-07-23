import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegeDeleteFormComponent} from './privilege-delete-form.component';

describe('PrivilegeDeleteFormsComponent', () => {
  let component: PrivilegeDeleteFormComponent;
  let fixture: ComponentFixture<PrivilegeDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
