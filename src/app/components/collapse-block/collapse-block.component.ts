import {Component, ElementRef, Input, input, signal, TemplateRef, ViewChild} from '@angular/core';
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
  submitEventActionType$: Subject<ActionType> = new Subject<ActionType>();
  lastButton: ElementRef | undefined;

  hidden = signal<boolean>(true);
  submitButton = signal<boolean>(false);
  closeButtonTitle = signal<string>("Close");
  validateButtonClass = signal<string>("btn-success");
  validationButtonTitle = signal<string>("Ok");

  @ViewChild("btnClose") btnClose: ElementRef | undefined;

  readonly collapseId = input.required<string>();
  readonly classArgs = input<string>("");
  readonly contentTemplate = input<TemplateRef<any>>();

  constructor(private readonly elementRef: ElementRef) {
  }

  @Input() set actionType(action: ActionType | undefined) {
    this.submitButton.set(action === ActionType.update || action === ActionType.delete);

    this.action = action
    this.validateButtonClass.set("btn-success");
    this.closeButtonTitle.set("Cancel");
    switch (this.action) {
      case ActionType.update:
        this.validationButtonTitle.set("Update");
        return
      case ActionType.delete:
        this.validationButtonTitle.set("Delete");
        this.validateButtonClass.set("btn-danger");
        return
      default:
        this.closeButtonTitle.set("Close");
        return
    }
  }

  toggle(elementRef: ElementRef) {
    this.elementRef.nativeElement.scrollIntoView();
    if (!this.hidden || this.hidden && elementRef === this.lastButton) {
      this.hidden.update(value => !value);
    }
    this.lastButton = elementRef;
  }

  hide() {
    this.hidden.set(false);
  }

  onSubmit() {
    if (this.action)
      this.submitEventActionType$.next(this.action);
  }
}
