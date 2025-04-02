import {Component, computed, input} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-control',
  imports: [
    NgIf
  ],
  templateUrl: './input-control.component.html'
})
export class InputControlComponent {
  readonly formGroup = input.required<FormGroup>();
  readonly formGroupFieldName = input.required<string>();

  readonly ifInvalid = input<boolean>(false);
  readonly submitInvalid = input<boolean>(false);

  readonly onlyErrorMessage = input<boolean>(false);
  readonly onlyValidMessage = input<boolean>(false);

  readonly rules = input<string>();
  readonly errorMessage = input<string>();
  readonly displayedFieldName = input<string>();

  errorMessageDisplayed = computed<string>(() => {
      let displayedFieldName = this.displayedFieldName();
      if (displayedFieldName === undefined)
        displayedFieldName = this.formGroupFieldName();

      let rules = this.rules();
      if (rules !== undefined)
        rules = " (" + rules + ")"
      else
        rules = "";

      let errorMessage = this.errorMessage();
      if (errorMessage === undefined)
        errorMessage = "Please write a correct " + displayedFieldName + rules;
      else
        errorMessage += rules;

      return errorMessage;
    }
  );
}
