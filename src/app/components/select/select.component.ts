import {Component, input, model, output} from '@angular/core';
import {SelectOption} from "../../shared/model/component/select/selectOption";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-select',
  imports: [
    FormsModule,
  ],
  templateUrl: './select.component.html'
})
export class SelectComponent {
  value = model<string | null>();

  readonly options = input.required<SelectOption[]>();
  readonly isLoading = input.required<boolean>();

  readonly defaultOption = input<boolean>(false);

  readonly onTouched = output<void>();
  readonly onChange = output<string | null>();

  onSelect(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      let value: string | null = event.target.value;
      if (value === "null") value = null;
      this.onChange.emit(value);
      this.onTouched.emit();
    }
  }

  onClick() {
    this.onTouched.emit();
  }
}
