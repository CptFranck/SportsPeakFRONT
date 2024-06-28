import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeModalComponent } from './privilege-modal.component';

describe('PrivilegeModalComponent', () => {
  let component: PrivilegeModalComponent;
  let fixture: ComponentFixture<PrivilegeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilegeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
