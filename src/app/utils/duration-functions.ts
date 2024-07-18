import {Duration} from "../interface/dto/duration";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export function createDurationForm(duration: Duration) {
  return new FormGroup({
    hours: new FormControl(
      duration.hours,
      [Validators.required,
        Validators.min(0),
        Validators.max(24),
        Validators.pattern("^[0-9]*$")]),
    minutes: new FormControl(
      duration.minutes,
      [Validators.required,
        Validators.min(0),
        Validators.max(59),
        Validators.pattern("^[0-9]*$")]),
    seconds: new FormControl(
      duration.seconds,
      [Validators.required,
        Validators.min(0),
        Validators.max(59),
        Validators.pattern("^[0-9]*$")]),
  })
}
