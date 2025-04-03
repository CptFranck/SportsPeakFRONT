import {Component, EventEmitter, input, model, Output} from '@angular/core';
import {SelectOption} from "../../interface/components/select/selectOption";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './select.component.html'
})
export class SelectComponent {
  value = model<string | null>(null);
  readonly options = input.required<SelectOption[]>();
  readonly defaultOption = input<boolean>(false);

  @Output() onTouched = new EventEmitter<boolean>();
  @Output() onChange = new EventEmitter<string | null>();

  onSelect(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      let value: string | null = event.target.value;
      if (value === "null")
        value = null;
      this.onChange.emit(value);
    }
  }

  onClick() {
    this.onTouched.emit(true);
  }
}
