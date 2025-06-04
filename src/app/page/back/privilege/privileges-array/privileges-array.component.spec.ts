import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivilegesArrayComponent} from './privileges-array.component';
import {generateTestPrivileges} from "../../../../utils/testFunctions";

describe('PrivilegesArrayComponent', () => {
  let component: PrivilegesArrayComponent;
  let fixture: ComponentFixture<PrivilegesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegesArrayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegesArrayComponent);
    component = fixture.componentInstance;

    const privileges = [generateTestPrivileges()];
    fixture.componentRef.setInput('privileges', privileges);
    fixture.componentRef.setInput('modalId', 'Id');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
