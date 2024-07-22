import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";
import {ActionType} from "../../../enum/action-type";

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
  action!: ActionType | undefined;
  @Input() modalId!: string;
  @Input() title!: string;
  @Input() staticBackdrop: boolean = false;
  @Input() contentTemplate: TemplateRef<any> | undefined;

  @ViewChild("btnClose") btnClose: ElementRef | undefined;

  readonly ActionType = ActionType;
  submitEvents: Subject<void> = new Subject<void>();
  closeButtonTitle: string = "Close";
  validateButtonClass: string = "btn-success";
  validationButtonTitle: string = "Ok";
  submitButton: boolean = false;

  @Input() set actionType(action: ActionType | undefined) {
    this.submitButton =
      action === ActionType.create ||
      action === ActionType.update ||
      action === ActionType.addEvolution ||
      action === ActionType.addPerformance;

    switch (this.action) {
      case ActionType.read:
        this.closeButtonTitle = "Close";
        return
      case ActionType.create:
        this.validationButtonTitle = "Create";
        this.validateButtonClass = "btn-success";
        this.closeButtonTitle = "Cancel";
        return
      case ActionType.update:
        this.validationButtonTitle = "Update";
        this.validateButtonClass = "btn-success";
        this.closeButtonTitle = "Cancel";
        return
      case ActionType.delete:
        this.validationButtonTitle = "Delete";
        this.validateButtonClass = "btn-danger";
        this.closeButtonTitle = "Cancel";
        return
      default:
        this.closeButtonTitle = "Close";
        return
    }
  }

  onSubmit() {
    this.submitEvents.next();
    if (this.btnClose && this.action === undefined)
      this.btnClose.nativeElement.click();
  }
}
