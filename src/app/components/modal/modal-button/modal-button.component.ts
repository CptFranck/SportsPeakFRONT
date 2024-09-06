import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-button',
  standalone: true,
  imports: [],
  templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent implements OnInit {
  AllWidthStyle: string = "";

  @Input() disabled: boolean = false;
  @Input() modalId!: string;
  @Input() modalValue?: any | undefined;
  @Input() btnClass?: string = "btn-success"
  @Input() allWidth?: boolean = false;

  @Output() onCLickModalButton: EventEmitter<any> = new EventEmitter();

  onClick() {
    if (this.onCLickModalButton) {
      this.onCLickModalButton.emit(this.modalValue)
    }
  }

  ngOnInit(): void {
    if (this.allWidth)
      this.AllWidthStyle = "width:100%"
  }
}
