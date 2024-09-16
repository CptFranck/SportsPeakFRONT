import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeDetailDisplayComponent } from './privilege-detail-display.component';

describe('PrivilegeDetailDisplayComponent', () => {
  let component: PrivilegeDetailDisplayComponent;
  let fixture: ComponentFixture<PrivilegeDetailDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeDetailDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivilegeDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
