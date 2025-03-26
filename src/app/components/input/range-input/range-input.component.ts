import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-range-input',
  templateUrl: './range-input.component.html'
})
export class RangeInputComponent {

  @Input() label!: string;
  @Input() min !: number;
  @Input() max !: number;
  @Input() step !: number;
  @Input() value !: number;

  @Output() onChange: EventEmitter<number> = new EventEmitter();

  change($event: Event) {
    if ($event.target instanceof HTMLInputElement) {
      this.value = parseInt($event.target.value);
      this.onChange.emit(parseInt($event.target.value));
    }
  }
}
