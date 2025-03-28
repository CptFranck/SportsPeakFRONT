import {Duration} from "../interface/dto/duration";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export function createDurationForm(duration: Duration) {
  return new FormGroup({
    hours: new FormControl(
      duration.hours,
      [Validators.required,
        Validators.min(0),
        Validators.max(23),
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

export function addDurationAmount(durationA: Duration, durationB: Duration) {
  durationA["seconds"] += durationB["seconds"];
  durationA["minutes"] += durationB["minutes"];
  durationA["hours"] += durationB["hours"];
}

////////////////////////////////////// GENERIC TIME FUNCTIONS /////////////////////////////////////////

export function getStringTime(duration: Duration): string {
  const formatedDuration: Duration = formatTimeDuration(duration);
  let stringTime: string = "";
  if (formatedDuration["hours"] >= 1)
    stringTime += formatedDuration["hours"] + "h";
  if (formatedDuration["minutes"] >= 1)
    stringTime += formatedDuration["minutes"] + "m";
  stringTime += formatedDuration["seconds"] + "s";
  return stringTime;
}

export function formatTimeDuration(duration: Duration): Duration {
  const formatDuration: Duration = {seconds: 0, minutes: 0, hours: 0};
  formatDuration["seconds"] = duration["seconds"] % 60;
  const additionalMinutes: number = (duration["seconds"] - formatDuration["seconds"]) / 60

  formatDuration["minutes"] = (duration["minutes"] + additionalMinutes) % 60;
  const additionalHours: number = (duration["minutes"] + additionalMinutes - formatDuration["minutes"]) / 60;

  formatDuration["hours"] = (duration["hours"] + additionalHours) % 60
  return formatDuration;
}
