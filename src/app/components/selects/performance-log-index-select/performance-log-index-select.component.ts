import {Component, forwardRef, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectComponent} from "../../select/select.component";

@Component({
  selector: 'app-performance-log-index-select',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PerformanceLogIndexSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './performance-log-index-select.component.html',
})
export class PerformanceLogIndexSelectComponent implements ControlValueAccessor {
  indexOptions: SelectOption[] = [];

  @Input() index!: number | undefined;

  @Input() set targetSetNumber(value: number | undefined) {
    console.log(value)
    this.initialize(value);
  }

  onChange: (value: number | undefined) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  initialize(targetSetNumber: number | undefined): void {
    this.indexOptions = []
    if (targetSetNumber) {
      for (let index: number = 1; index <= targetSetNumber; index++) {
        this.indexOptions.push({
          title: index.toString(),
          value: index.toString(),
        });
      }
      this.indexOptions.push({
        title: (this.indexOptions.length + 1).toString() + " (additional rep)",
        value: (this.indexOptions.length + 1).toString()
      });
    }
    console.log(this.indexOptions)
  }

  writeValue(index: number | undefined): void {
    this.index = index;
  }

  registerOnChange(fn: (value: number | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setIndex(stringIndex: string | undefined) {
    if (stringIndex) {
      let index: number = parseInt(stringIndex)
      this.index = index;
      this.onChange(index);
    }
  }
}
