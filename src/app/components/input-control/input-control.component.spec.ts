import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputControlComponent} from './input-control.component';
import {FormControl, FormGroup} from "@angular/forms";

describe('InputControlComponent', () => {
  let component: InputControlComponent;
  let fixture: ComponentFixture<InputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputControlComponent]
    })
      .compileComponents();

    const formGroup = new FormGroup({
      test: new FormControl(1, [])
    });

    fixture = TestBed.createComponent(InputControlComponent);
    fixture.componentRef.setInput('formGroup', formGroup);
    fixture.componentRef.setInput('formGroupFieldName', "test");

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
