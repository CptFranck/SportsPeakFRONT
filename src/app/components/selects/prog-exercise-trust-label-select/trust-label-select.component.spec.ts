import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrustLabelSelectComponent} from './trust-label-select.component';

describe('VisibilitySelectComponent', () => {
  let component: TrustLabelSelectComponent;
  let fixture: ComponentFixture<TrustLabelSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustLabelSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrustLabelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
