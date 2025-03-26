import {Component, forwardRef, Input} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {TrustLabel} from "../../../interface/enum/trustLabel";

@Component({
    selector: 'app-prog-exercise-trust-label-select',
    imports: [
        SelectComponent
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TrustLabelSelectComponent),
            multi: true,
        }
    ],
    templateUrl: './trust-label-select.component.html'
})
export class TrustLabelSelectComponent implements ControlValueAccessor {

  trustLabelOptions: SelectOption[] = [{
    title: TrustLabel.UNVERIFIED,
    value: TrustLabel.UNVERIFIED,
  }, {
    title: TrustLabel.TRUSTED,
    value: TrustLabel.TRUSTED,
  }, {
    title: TrustLabel.EXPERT_APPROVED,
    value: TrustLabel.EXPERT_APPROVED,
  }];

  @Input() trustLabel!: string;

  onChange: (value: string) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  writeValue(targetSetState: string): void {
    this.trustLabel = targetSetState;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setTargetSetId(targetSetState: string | undefined): void {
    if (targetSetState) {
      this.trustLabel = targetSetState;
      this.onChange(targetSetState)
    }
  }
}
