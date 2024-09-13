import {Component, forwardRef, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectComponent} from "../../select/select.component";
import {TargetSet} from "../../../interface/dto/target-set";
import {PerformanceLog} from "../../../interface/dto/performance-log";
import {filterPerformanceLogByDate} from "../../../utils/performance-log-functions";

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

  @Input() index!: number;
  @Input() logDate!: string;

  @Input() set targetSet(targetSet: TargetSet | undefined) {
    this.indexOptions = []
    if (targetSet) {
      const performanceLogThisDate: PerformanceLog[] = filterPerformanceLogByDate(targetSet, this.logDate);
      let totalSets: number = targetSet.setNumber;
      if (performanceLogThisDate?.length >= totalSets)
        totalSets = performanceLogThisDate.length + 1;

      for (let index: number = 1; index <= totalSets; index++) {
        let option: SelectOption = {
          title: index.toString(),
          value: index.toString(),
        }
        if (index > targetSet.setNumber) {
          option.title += " (additional rep)";
        }
        this.indexOptions.push(option);
      }
    }
  }

  onChange: (value: number) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  writeValue(index: number): void {
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
