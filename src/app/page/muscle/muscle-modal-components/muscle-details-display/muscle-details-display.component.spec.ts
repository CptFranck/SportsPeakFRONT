import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleDetailsDisplayComponent} from './muscle-details-display.component';

describe('MuscleDetailsComponent', () => {
  let component: MuscleDetailsDisplayComponent;
  let fixture: ComponentFixture<MuscleDetailsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleDetailsDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleDetailsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
