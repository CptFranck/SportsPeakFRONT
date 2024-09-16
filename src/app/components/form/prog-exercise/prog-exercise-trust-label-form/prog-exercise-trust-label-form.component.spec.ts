import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExerciseTrustLabelFormComponent} from './prog-exercise-trust-label-form.component';

describe('TargetSetStateFormComponent', () => {
  let component: ProgExerciseTrustLabelFormComponent;
  let fixture: ComponentFixture<ProgExerciseTrustLabelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExerciseTrustLabelFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExerciseTrustLabelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
