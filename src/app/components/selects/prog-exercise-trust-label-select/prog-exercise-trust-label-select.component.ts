import {Component, forwardRef, Input} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {TrustLabel} from "../../../interface/enum/trustLabel";

@Component({
  selector: 'app-prog-exercise-trust-label-select',
  standalone: true,
  imports: [
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProgExerciseTrustLabelSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './prog-exercise-trust-label-select.component.html',
})
export class ProgExerciseTrustLabelSelectComponent implements ControlValueAccessor {

  targetSetStateOptions: SelectOption[] = [{
    title: TrustLabel.UNVERIFIED,
    value: TrustLabel.UNVERIFIED,
  }, {
    title: TrustLabel.TRUSTED,
    value: TrustLabel.TRUSTED,
  }, {
    title: TrustLabel.EXPERT_APPROVED,
    value: TrustLabel.EXPERT_APPROVED,
  }];

  @Input() targetSetState!: string;

  onChange: (value: string) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  writeValue(targetSetState: string): void {
    this.targetSetState = targetSetState;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setTargetSetId(targetSetState: string | undefined): void {
    if (targetSetState) {
      this.targetSetState = targetSetState;
      this.onChange(targetSetState)
    }
  }
}
