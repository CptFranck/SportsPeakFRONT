import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";
import {ActionType} from "../../interface/enum/action-type";
import {CollapseButtonComponent} from "../collapse-buton/collapse-button.component";

@Component({
  selector: 'app-collapse-block',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet,
    NgIf,
    CollapseButtonComponent
  ],
  templateUrl: './collapse-block.component.html',
})
export class CollapseBlockComponent {

  action!: ActionType | undefined;
  submitButton: boolean = false;
  closeButtonTitle: string = "Close";
  validateButtonClass: string = "btn-success";
  validationButtonTitle: string = "Ok";
  submitEventActionType$: Subject<ActionType> = new Subject<ActionType>();

  @ViewChild("btnClose") btnClose: ElementRef | undefined;

  @Input() visible: boolean = false;
  @Input() collapseId!: string;
  @Input() classArgs: string = "";
  @Input() contentTemplate: TemplateRef<any> | undefined;

  @Input() set actionType(action: ActionType | undefined) {
    this.submitButton = action === ActionType.update || action === ActionType.delete;

    this.action = action
    this.validateButtonClass = "btn-success";
    this.closeButtonTitle = "Cancel";
    switch (this.action) {
      case ActionType.update:
        this.validationButtonTitle = "Update";
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

  toggle() {
    this.visible = !this.visible;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  onSubmit() {
    if (this.action)
      this.submitEventActionType$.next(this.action);
  }
}
