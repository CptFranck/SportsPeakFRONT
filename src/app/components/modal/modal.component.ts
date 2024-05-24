import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input()
  id!: string;
  @Input()
  title!: string;
  @Input()
  closeNameButton?: string = "Cancel";
  @Input()
  validateNameButton?: string = "Save";
  @Input()
  closeActionButton!: () => void;
  @Input()
  validateActionButton!: () => void;
}
