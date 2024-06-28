import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesArrayComponent } from './roles-array.component';

describe('RolesArrayComponent', () => {
  let component: RolesArrayComponent;
  let fixture: ComponentFixture<RolesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolesArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
