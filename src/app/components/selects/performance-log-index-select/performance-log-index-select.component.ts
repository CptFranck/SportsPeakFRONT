import {Component, computed, forwardRef, input, signal} from '@angular/core';
import {SelectOption} from "../../../shared/model/component/select/selectOption";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectComponent} from "../../select/select.component";
import {TargetSet} from "../../../shared/model/dto/target-set";

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

  readonly indexOptions = computed<SelectOption[]>(() => {
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

  index = signal<string | null>(null);

  onChange: (value: number) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(index: number): void {
    this.index.set(index.toString());
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setIndex(stringIndex: string | null) {
    if (stringIndex === null) return;
    this.index.set(stringIndex);
    this.onChange(parseInt(stringIndex));
    this.onTouched();
  }
}
