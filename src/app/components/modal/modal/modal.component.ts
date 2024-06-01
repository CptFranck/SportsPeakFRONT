import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  @Input() modalId!: string;
  @Input() title!: string;
  @Input() validateClassButton: string = "btn-success";
  @Input() validateTitleButton: string = "Validate";
  @Input() isFormModal: boolean = false;
  @Input() staticBackdrop: boolean = false;
  @Input() contentTemplate: TemplateRef<any> | undefined;

  @ViewChild("btnClose") btnClose: ElementRef | undefined;
  eventsSubject: Subject<void> = new Subject<void>();

  onSubmit() {
    if (this.isFormModal)
      this.eventsSubject.next();
  }
}
