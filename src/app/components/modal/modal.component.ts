import {Component, Input} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  @Input()
  id!: string;
  @Input()
  title!: string;
  
}
