import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetStepComponent} from './target-set-step.component';

describe('TargetSetCollapsesComponent', () => {
  let component: TargetSetStepComponent;
  let fixture: ComponentFixture<TargetSetStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetStepComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
