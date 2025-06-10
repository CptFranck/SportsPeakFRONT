import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RangeInputComponent} from './range-input.component';

describe('RangeInputComponent', () => {
  let component: RangeInputComponent;
  let fixture: ComponentFixture<RangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RangeInputComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', "Title");
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 0);
    fixture.componentRef.setInput('step', 0)
    fixture.componentRef.setInput('value', 0)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
