import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-collapse-button',
  standalone: true,
  imports: [],
  templateUrl: './collapse-button.component.html',
})
export class CollapseButtonComponent {
  @Input() collapseId!: string;
  @Input() value!: any;

  @Output() onClickEvent: EventEmitter<string> = new EventEmitter();

  onClick() {
    this.onClickEvent.emit(this.value);
  }
}
