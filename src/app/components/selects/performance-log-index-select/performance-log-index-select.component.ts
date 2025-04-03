import {Component, computed, forwardRef, input, signal} from '@angular/core';
import {SelectOption} from "../../../interface/components/select/selectOption";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectComponent} from "../../select/select.component";
import {TargetSet} from "../../../interface/dto/target-set";

@Component({
  selector: 'app-performance-log-index-select',
  imports: [
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PerformanceLogIndexSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './performance-log-index-select.component.html'
})
export class PerformanceLogIndexSelectComponent implements ControlValueAccessor {
  readonly targetSet = input.required<TargetSet | undefined>();

  indexOptions = computed<SelectOption[]>(() => {
    const options: SelectOption[] = [];
    const targetSet = this.targetSet();
    if (targetSet) {
      let totalSets: number = targetSet.setNumber + 1;
      for (let index: number = 1; index <= totalSets; index++) {
        let option: SelectOption = {
          title: index.toString(),
          value: index.toString(),
        }
        if (index > targetSet.setNumber) {
          option.title += " (additional rep)";
        }
        options.push(option);
      }
    }
    return options;
  });

  index = signal<number | undefined>(undefined);

  onChange: (value: number) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(index: number): void {
    this.index.set(index);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setIndex(stringIndex: string) {
    let index: number = parseInt(stringIndex)
    this.index.set(index);
    this.onChange(index);
  }
}
