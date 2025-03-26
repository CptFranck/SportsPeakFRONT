import {Component, forwardRef, Input} from '@angular/core';
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

  @Input() visibility!: string;

  onChange: (value: string) => void = () => {
  };

  onTouched: ($event: boolean) => void = () => {
  };

  writeValue(visibility: string): void {
    this.visibility = visibility;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setVisibilityId(visibility: string | undefined): void {
    if (visibility) {
      this.visibility = visibility;
      this.onChange(visibility)
    }
  }
}
