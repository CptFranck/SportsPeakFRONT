import {Component, Input} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {ModalButtonComponent} from "../modal-button/modal-button.component";
import {MuscleEntityFormComponent} from "../../../page/muscle/muscle-entity-form/muscle-entity-form.component";

@Component({
  selector: 'app-modal-and-button',
  standalone: true,
  imports: [
    ModalComponent,
    ModalButtonComponent,
    MuscleEntityFormComponent
  ],
  templateUrl: './modal-and-button.component.html',
})
export class ModalAndButtonComponent {
  @Input() modalId!: string;
  @Input() staticBackdrop: boolean = false;
  @Input() title!: string;
  @Input() buttonTitle!: string;
}
