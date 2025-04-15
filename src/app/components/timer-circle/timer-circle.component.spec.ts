import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerCircleComponent } from './timer-circle.component';

describe('TimerCircleComponent', () => {
  let component: TimerCircleComponent;
  let fixture: ComponentFixture<TimerCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
