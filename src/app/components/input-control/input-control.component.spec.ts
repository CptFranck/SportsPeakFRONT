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

    fixture = TestBed.createComponent(InputControlComponent);
    component = fixture.componentInstance;
    
    component.formGroup = new FormGroup({
      test: new FormControl(1, [])
    });
    component.formGroupFieldName = "test";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
