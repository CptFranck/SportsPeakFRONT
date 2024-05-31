import {Component, Input} from '@angular/core';
import {ModalBodyComponent} from "../modalBody/modal-body.component";
import {ModalButtonComponent} from "../modal-button/modal-button.component";
import {MuscleFormComponent} from "../../../page/muscle/muscle-form/muscle-form.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ModalBodyComponent,
    ModalButtonComponent,
    MuscleFormComponent
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() modalId!: string;
  @Input() staticBackdrop: boolean = false;
  @Input() title!: string;
}
