import {Component, Input} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {ModalButtonComponent} from "../modal-button/modal-button.component";
import {MuscleFormComponent} from "../../../page/muscle/muscle-form/muscle-form.component";

@Component({
  selector: 'app-modal-and-button',
  standalone: true,
  imports: [
    ModalComponent,
    ModalButtonComponent,
    MuscleFormComponent
  ],
  templateUrl: './modal-and-button.component.html',
})
export class ModalAndButtonComponent {
  @Input() modalId!: string;
  @Input() staticBackdrop: boolean = false;
  @Input() title!: string;
  @Input() buttonTitle!: string;
}
