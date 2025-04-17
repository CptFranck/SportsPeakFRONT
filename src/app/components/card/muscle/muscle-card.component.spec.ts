import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleCardComponent} from './muscle-card.component';

describe('MuscleComponent', () => {
  let component: MuscleCardComponent;
  let fixture: ComponentFixture<MuscleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
