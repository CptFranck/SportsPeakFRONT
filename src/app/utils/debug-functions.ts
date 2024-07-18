import {FormGroup} from "@angular/forms";

export function debugFormGroup(formGroup: FormGroup) {
  if (formGroup.invalid) {
    const invalid = [];
    const controls = formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
  }
}
