import {Component, forwardRef, signal} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../shared/model/component/select/selectOption";
import {TrustLabel} from "../../../shared/model/enum/trust-label";

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

  trustLabel = signal<string>(TrustLabel.UNVERIFIED);

  onChange: (value: string) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(targetSetState: string): void {
    this.trustLabel.set(targetSetState);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setTargetSetId(targetSetState: string | null): void {
    if (targetSetState === null) return;
    this.trustLabel.set(targetSetState);
    this.onChange(targetSetState);
    this.onTouched();
  }
}
