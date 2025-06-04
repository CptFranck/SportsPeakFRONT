import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function fileWeightValidator(maxSizeInByte: number, maxSizeValueAndUnit: string): ValidatorFn {
  return (abstractControl: AbstractControl): ValidationErrors | null => {
    const file: File | null = abstractControl.value;
    if (file) {
      const fileSizeInByte = file.size;
      if (fileSizeInByte > maxSizeInByte) {
        const error: ValidationErrors = {maxFileSizeSupported: `file size is larger than ${maxSizeValueAndUnit}`}
        abstractControl.setErrors(error);
        return error;
      }
    }
    return null;
  };
}
