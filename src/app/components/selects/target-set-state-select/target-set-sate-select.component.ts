import {Component, forwardRef, Input} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {TargetSetState} from "../../../interface/enum/targetSetState";

@Component({
  selector: 'app-target-set-state-select',
  standalone: true,
  imports: [
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TargetSetSateSelectComponent),
      multi: true,
    }
  ],
  templateUrl: './target-set-sate-select.component.html',
})
export class TargetSetSateSelectComponent implements ControlValueAccessor {

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

  @Input() targetSetState!: string;

  onChange: (value: string) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  writeValue(targetSetState: string): void {
    this.targetSetState = targetSetState;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setVisibilityId(visibility: string | undefined): void {
    if (visibility) {
      this.targetSetState = visibility;
      this.onChange(visibility)
    }
  }
}
