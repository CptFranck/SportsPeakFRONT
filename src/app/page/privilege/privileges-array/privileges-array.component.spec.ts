import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegesArrayComponent } from './privileges-array.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
