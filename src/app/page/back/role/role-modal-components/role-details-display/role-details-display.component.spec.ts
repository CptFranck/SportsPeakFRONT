import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDetailsDisplayComponent } from './role-details-display.component';

describe('RoleDetailsDisplayComponent', () => {
  let component: RoleDetailsDisplayComponent;
  let fixture: ComponentFixture<RoleDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDetailsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
