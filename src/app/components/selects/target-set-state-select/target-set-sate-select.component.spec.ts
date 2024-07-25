import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetSateSelectComponent} from './target-set-sate-select.component';

describe('VisibilitySelectComponent', () => {
  let component: TargetSetSateSelectComponent;
  let fixture: ComponentFixture<TargetSetSateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetSateSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetSateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
