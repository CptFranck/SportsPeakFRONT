import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseTrustLabelSelectComponent} from './prog-exercise-trust-label-select.component';

describe('VisibilitySelectComponent', () => {
  let component: ProgExerciseTrustLabelSelectComponent;
  let fixture: ComponentFixture<ProgExerciseTrustLabelSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExerciseTrustLabelSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExerciseTrustLabelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
