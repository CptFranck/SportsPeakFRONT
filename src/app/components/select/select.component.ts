import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectOption} from "../../interface/components/select/selectOption";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() value: string | undefined;
  @Input() options!: SelectOption[];

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
