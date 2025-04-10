import {Component, input, output} from '@angular/core';

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

  readonly onChange = output<number>();

  change($event: Event) {
    if ($event.target instanceof HTMLInputElement) {
      this.onChange.emit(parseInt($event.target.value));
    }
  }
}
