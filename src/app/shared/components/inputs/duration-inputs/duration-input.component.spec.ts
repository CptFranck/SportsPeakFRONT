import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DurationInputComponent} from './duration-input.component';
import {createDurationForm} from "../../../../utils/duration-functions";
import {Duration} from "../../../model/dto/duration";
import {FormGroup} from "@angular/forms";

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DurationInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DurationInputComponent);
    component = fixture.componentInstance;

    const defaultDuration: Duration = {seconds: 0, minutes: 0, hours: 0};
    const durationFormGroup = new FormGroup({defaultDuration: createDurationForm(defaultDuration)})
    fixture.componentRef.setInput('fieldName', "defaultDuration");
    fixture.componentRef.setInput('formGroup', durationFormGroup);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
