import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {SelectComponent} from "../../select/select.component";
import {WeightUnit} from "../../../interface/enum/weightUnit";

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
    title: WeightUnit.KILOGRAMME,
    value: WeightUnit.KILOGRAMME,
  }, {
    title: WeightUnit.POUND,
    value: WeightUnit.POUND,
  }];

  @Input() weightUnit!: string;

  onChange: (value: string) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  writeValue(weightUnit: string): void {
    this.weightUnit = weightUnit;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setWeightUnitId(weightUnit: string | undefined): void {
    if (weightUnit) {
      this.weightUnit = weightUnit;
      this.onChange(weightUnit)
    }
  }
}
