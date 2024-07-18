import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";
import {Duration} from "../../../interface/dto/duration";
import {fn} from "@angular/compiler";
import {InputControlComponent} from "../../input-control/input-control.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-duration-input',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true
    }
  ],
  templateUrl: './duration-input.component.html',
})
export class DurationInputComponent implements OnInit, ControlValueAccessor, Validator {

  durationForm: FormGroup | null = null;

  @Input() duration!: Duration;
  @Input() submitInvalidForm!: boolean;

  onChange: (value: Duration) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  ngOnInit(): void {
    this.durationForm = new FormGroup({
      hours: new FormControl(
        this.duration.hours,
        [Validators.required,
          Validators.min(0),
          Validators.max(24),
          Validators.pattern("^[0-9]*$")]),
      minutes: new FormControl(
        this.duration.minutes,
        [Validators.required,
          Validators.min(0),
          Validators.max(59),
          Validators.pattern("^[0-9]*$")]),
      seconds: new FormControl(
        this.duration.seconds,
        [Validators.required,
          Validators.min(0),
          Validators.max(59),
          Validators.pattern("^[0-9]*$")]),
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(duration: Duration): void {
    this.duration = duration;
  }

  setHours(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.duration.hours = event.target.value;
      this.onChange(this.duration);
    }
  }

  setMinutes(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.duration.minutes = event.target.value;
      this.onChange(this.duration);
    }
  }

  setSeconds(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.duration.seconds = event.target.value;
      this.onChange(this.duration);
    }
  }

  isValid() {
    return !!(this.countryCode && this.phoneNumber);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return undefined;
  }

}
