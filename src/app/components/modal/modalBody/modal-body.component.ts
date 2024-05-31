import {Component, Input} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-modal-body',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './modal-body.component.html',
})
export class ModalBodyComponent {

  @Input() id!: string;
  @Input() title!: string;
  @Input() staticBackdrop: boolean = false;

}
