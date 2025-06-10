import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetStateSelectComponent} from './target-set-state-select.component';

describe('VisibilitySelectComponent', () => {
  let component: TargetSetStateSelectComponent;
  let fixture: ComponentFixture<TargetSetStateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetStateSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetStateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
