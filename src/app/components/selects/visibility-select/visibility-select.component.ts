import {Component, forwardRef, signal} from '@angular/core';
import {SelectComponent} from "../../select/select.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../../shared/model/component/select/selectOption";
import {VisibilityEnum} from "../../../shared/model/enum/visibility.enum";

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
    title: VisibilityEnum.PRIVATE,
    value: VisibilityEnum.PRIVATE,
  }, {
    title: VisibilityEnum.PUBLIC,
    value: VisibilityEnum.PUBLIC,
  }];

  visibility = signal<string>(VisibilityEnum.PRIVATE);

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
    this.onChange(visibility);
    this.onTouched();
  }
}
