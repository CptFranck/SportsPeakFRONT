import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectOption} from "../../interface/components/select/selectOption";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-select',
    imports: [
        NgForOf,
        NgIf,
        FormsModule
    ],
    templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() value: string | undefined;
  @Input() defaultValue: string | undefined;
  @Input() defaultTitle: string = "...";
  @Input() options!: SelectOption[];
  @Input() defaultOption: boolean = false;

  @Output() onTouched: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  onSelect(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      let value: string | undefined = event.target.value;
      if (value === "undefined")
        value = undefined;
      this.value = value;
      this.onChange.emit(value);
    }
  }

  onClick() {
    this.onTouched.emit(true);
  }
}
