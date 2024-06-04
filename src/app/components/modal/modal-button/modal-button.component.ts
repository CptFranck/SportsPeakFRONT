import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-button',
  standalone: true,
  imports: [],
  templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent {
  @Input() modalId!: string;
  @Input() modalValue?: any | undefined;
  @Input() btnClass?: string = "btn-success"

  @Output() onCLickModalButton: EventEmitter<any> = new EventEmitter();

  onClick() {
    if (this.onCLickModalButton) {
      this.onCLickModalButton.emit(this.modalValue)
    }
  }
}
