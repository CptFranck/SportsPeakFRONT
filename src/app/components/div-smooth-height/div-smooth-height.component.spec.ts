import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivSmoothHeightComponent } from './div-smooth-height.component';

describe('DivSmoothHeightComponent', () => {
  let component: DivSmoothHeightComponent;
  let fixture: ComponentFixture<DivSmoothHeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivSmoothHeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivSmoothHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
