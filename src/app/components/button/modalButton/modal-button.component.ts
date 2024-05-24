import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal-button',
  standalone: true,
  imports: [],
  templateUrl: './modal-button.component.html',
})
export class ModalButtonComponent {
  @Input()
  id?: string = ""

  @Input()
  btnClass?: string = "btn-success"
}
