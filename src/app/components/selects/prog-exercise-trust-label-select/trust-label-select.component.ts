import {Component, forwardRef, signal} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../shared/model/component/select/selectOption";
import {TrustLabelEnum} from "../../../shared/model/enum/trustLabel.enum";

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
    title: TrustLabelEnum.UNVERIFIED,
    value: TrustLabelEnum.UNVERIFIED,
  }, {
    title: TrustLabelEnum.TRUSTED,
    value: TrustLabelEnum.TRUSTED,
  }, {
    title: TrustLabelEnum.EXPERT_APPROVED,
    value: TrustLabelEnum.EXPERT_APPROVED,
  }];

  trustLabel = signal<string>(TrustLabelEnum.UNVERIFIED);

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
    this.onChange(targetSetState)
  }
}
