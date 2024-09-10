import {Component, forwardRef, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-performance-log-index-select',
  standalone: true,
  imports: [
    NgForOf
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
export class PerformanceLogIndexSelectComponent {
  selectOptions: SelectOption[] = [];

  @Input() set targetSetNumber(value: number | undefined) {
    this.initialize(value);
  }

  onChange: (value: number | undefined) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  initialize(targetSetNumber: number | undefined): void {
    if (targetSetNumber)
      for (let index: number = 1; index <= targetSetNumber; index++) {
        this.selectOptions.push({
          title: index.toString(),
          value: index.toString(),
        });
      }
  }

  writeValue(exerciseId: number | undefined): void {
    this.targetSetNumber = exerciseId;
  }

  registerOnChange(fn: (value: number | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setExerciseId(exerciseId: string | undefined) {
    if (exerciseId) {
      let exId: number = parseInt(exerciseId)
      this.targetSetNumber = exId;
      this.onChange(exId);
    }
  }
}
