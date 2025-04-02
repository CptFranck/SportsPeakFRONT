import {Component, EventEmitter, input, model, Output} from '@angular/core';
import {SelectOption} from "../../interface/components/select/selectOption";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './select.component.html'
})
export class SelectComponent {
  value = model<string>();
  readonly options = input.required<SelectOption[]>();

  @Output() onTouched = new EventEmitter<boolean>();
  @Output() onChange = new EventEmitter<string>();

  onSelect(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      let value: string | undefined = event.target.value;
      if (value === "undefined")
        value = undefined;
      this.onChange.emit(value);
    }
  }

  onClick() {
    this.onTouched.emit(true);
  }
}
