import {Component, ElementRef, Input, TemplateRef, ViewChild} from '@angular/core';
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";
import {ActionType} from "../../interface/enum/action-type";

@Component({
  selector: 'app-collapse-block',
  imports: [
    NgTemplateOutlet,
    NgIf,
  ],
  templateUrl: './collapse-block.component.html'
})
export class CollapseBlockComponent {

  action!: ActionType | undefined;
  submitButton: boolean = false;
  closeButtonTitle: string = "Close";
  validateButtonClass: string = "btn-success";
  validationButtonTitle: string = "Ok";
  submitEventActionType$: Subject<ActionType> = new Subject<ActionType>();
  lastButton: ElementRef | undefined;

  @ViewChild("btnClose") btnClose: ElementRef | undefined;

  @Input() visible: boolean = false;
  @Input() collapseId!: string;
  @Input() classArgs: string = "";
  @Input() contentTemplate: TemplateRef<any> | undefined;

  constructor(private readonly elementRef: ElementRef) {
  }

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

  toggle(elementRef: ElementRef) {
    this.elementRef.nativeElement.scrollIntoView();
    if (!this.visible || this.visible && elementRef === this.lastButton) {
      this.visible = !this.visible;
    }
    this.lastButton = elementRef;
  }

  hide() {
    this.visible = false;
  }

  onSubmit() {
    if (this.action)
      this.submitEventActionType$.next(this.action);
  }
}
