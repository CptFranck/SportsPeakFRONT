import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

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
