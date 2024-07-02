import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusclesArrayComponent } from './muscles-array.component';

describe('MusclesArrayComponent', () => {
  let component: MusclesArrayComponent;
  let fixture: ComponentFixture<MusclesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusclesArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusclesArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
