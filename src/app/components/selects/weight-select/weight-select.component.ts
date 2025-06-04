import {Component, forwardRef, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../shared/model/component/select/selectOption";
import {SelectComponent} from "../../select/select.component";
import {WeightUnitEnum} from "../../../shared/model/enum/weightUnit.enum";

@Component({
  selector: 'app-weight-select',
  imports: [
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeightSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './weight-select.component.html'
})
export class WeightSelectComponent implements ControlValueAccessor {

  visibilityOptions: SelectOption[] = [{
    title: WeightUnitEnum.KILOGRAMME,
    value: WeightUnitEnum.KILOGRAMME,
  }, {
    title: WeightUnitEnum.POUND,
    value: WeightUnitEnum.POUND,
  }];

  weightUnit = signal<string>(WeightUnitEnum.KILOGRAMME);

  onChange: (value: string) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(weightUnit: string): void {
    this.weightUnit.set(weightUnit);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setWeightUnitId(weightUnit: string | null): void {
    if (weightUnit == null) return;
    this.weightUnit.set(weightUnit);
    this.onChange(weightUnit)
  }
}
