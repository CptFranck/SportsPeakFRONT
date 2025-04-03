import {Component, forwardRef, signal} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {TargetSetState} from "../../../interface/enum/targetSetState";

@Component({
  selector: 'app-target-set-state-select',
  imports: [
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TargetSetStateSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './target-set-state-select.component.html'
})
export class TargetSetStateSelectComponent implements ControlValueAccessor {

  targetSetStateOptions: SelectOption[] = [{
    title: TargetSetState.USED,
    value: TargetSetState.USED,
  }, {
    title: TargetSetState.UNUSED,
    value: TargetSetState.UNUSED,
  }, {
    title: TargetSetState.HIDDEN,
    value: TargetSetState.HIDDEN,
  }];

  targetSetState = signal<string>(TargetSetState.USED);

  onChange: (value: string) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(targetSetState: string): void {
    this.targetSetState.set(targetSetState);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setTargetSetId(targetSetState: string | null): void {
    if (targetSetState === null) return
    this.targetSetState.set(targetSetState);
    this.onChange(targetSetState)
  }
}
