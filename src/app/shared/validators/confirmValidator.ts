import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (abstractControl: AbstractControl): ValidationErrors | null => {

    const control: AbstractControl | null = abstractControl.get(controlName);
    const matchingControl: AbstractControl | null = abstractControl.get(matchingControlName);

    if (control!.value !== matchingControl!.value) {
      const error: ValidationErrors = {confirmedValidator: 'Passwords do not match'};
      matchingControl!.setErrors(error);
      return error;
    }
    matchingControl!.setErrors(null);
    return null;
  }
}
