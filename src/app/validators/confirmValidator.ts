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

export function fileTypeValidator(type: string): ValidatorFn {
  return (abstractControl: AbstractControl): ValidationErrors | null => {
    const file: File | null = abstractControl.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        const error: ValidationErrors = {requiredFileType: 'filetype do not supported'}
        abstractControl.setErrors(error);
        return error;
      }
    }
    return null;
  };
}
