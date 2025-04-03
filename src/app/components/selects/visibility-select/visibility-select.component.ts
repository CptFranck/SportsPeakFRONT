import {Component, forwardRef, signal} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../interface/components/select/selectOption";
import {Visibility} from "../../../interface/enum/visibility";

@Component({
  selector: 'app-visibility-select',
  imports: [
    SelectComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VisibilitySelectComponent),
      multi: true,
    }
  ],
  templateUrl: './visibility-select.component.html'
})
export class VisibilitySelectComponent implements ControlValueAccessor {

  visibilityOptions: SelectOption[] = [{
    title: Visibility.PRIVATE,
    value: Visibility.PRIVATE,
  }, {
    title: Visibility.PUBLIC,
    value: Visibility.PUBLIC,
  }];

  visibility = signal<string>(Visibility.PRIVATE);

  onChange: (value: string) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(visibility: string): void {
    this.visibility.set(visibility);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setVisibilityId(visibility: string | null): void {
    if (visibility == null) return;
    this.visibility.set(visibility);
    this.onChange(visibility)
  }
}
