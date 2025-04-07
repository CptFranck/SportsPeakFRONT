import {Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'app-range-input',
  templateUrl: './range-input.component.html'
})
export class RangeInputComponent {

  readonly label = input.required<string>();
  readonly min = input.required<number>();
  readonly max = input.required<number>();
  readonly step = input.required<number>();

  readonly value = input.required<number>();

  @Output() onChange = new EventEmitter();

  change($event: Event) {
    if ($event.target instanceof HTMLInputElement) {
      this.onChange.emit(parseInt($event.target.value));
    }
  }
}
