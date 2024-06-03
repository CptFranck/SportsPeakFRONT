import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleModalComponent } from './muscle-modal.component';

describe('MuscleModalComponent', () => {
  let component: MuscleModalComponent;
  let fixture: ComponentFixture<MuscleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuscleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
