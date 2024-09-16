import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";
import {ActionType} from "../../../interface/enum/action-type";

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
  submitButton: boolean = false;
  closeButtonTitle: string = "Close";
  validateButtonClass: string = "btn-success";
  validationButtonTitle: string = "Ok";
  submitEventActionType$: Subject<ActionType> = new Subject<ActionType>();

  @Input() modalId!: string;
  @Input() title!: string;
  @Input() staticBackdrop: boolean = false;
  @Input() contentTemplate: TemplateRef<any> | undefined;

  @ViewChild("btnClose") btnClose: ElementRef | undefined;

  readonly ActionType = ActionType;

  @Input() set actionType(action: ActionType | undefined) {
    this.submitButton =
      action === ActionType.create ||
      action === ActionType.update ||
      action === ActionType.delete ||
      action === ActionType.addEvolution;

    this.action = action
    this.validateButtonClass = "btn-success";
    this.closeButtonTitle = "Cancel";
    switch (this.action) {
      case ActionType.read:
        this.closeButtonTitle = "Close";
        return
      case ActionType.create:
        this.validationButtonTitle = "Create";
        return
      case ActionType.update:
        this.validationButtonTitle = "Update";
        return
      case ActionType.addEvolution:
        this.validationButtonTitle = "Add an updated objective";
        return
      case ActionType.delete:
        this.validationButtonTitle = "Delete";
        this.validateButtonClass = "btn-danger";
        return
      default:
        this.closeButtonTitle = "Close";
        return
    }
  }

  onSubmit() {
    if (this.action)
      this.submitEventActionType$.next(this.action);
    if (this.btnClose)
      this.btnClose.nativeElement.click();
  }
}
