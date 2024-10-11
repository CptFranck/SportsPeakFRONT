import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-range-input',
  standalone: true,
  imports: [],
  templateUrl: './range-input.component.html',
  styleUrl: './range-input.component.css'
})
export class RangeInputComponent {

  @Input() label!: string;
  @Input() min !: number;
  @Input() max !: number;
  @Input() step !: number;
  @Input() value !: number;

  @Output() onChange: EventEmitter<number> = new EventEmitter();

  change(event: number) {
    this.onChange.emit(event);
  }
}
