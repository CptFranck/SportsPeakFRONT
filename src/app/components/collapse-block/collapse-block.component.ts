import {Component, computed, ElementRef, input, signal, TemplateRef, viewChild} from '@angular/core';
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
  submitEventActionType$ = new Subject<ActionType>();
  hidden = signal<boolean>(true);

  readonly collapseId = input.required<string>();
  readonly classArgs = input<string>("");
  readonly contentTemplate = input<TemplateRef<any>>();
  readonly actionType = input.required<ActionType | undefined>();

  readonly submitButton = computed<boolean>(() => {
    return this.actionType() === ActionType.update || this.actionType() === ActionType.delete;
  });
  readonly validateButtonClass = computed<string>(() => {
    if (this.actionType() == ActionType.delete) return "btn-danger"
    else return "btn-success"
  });
  readonly closeButtonTitle = computed<string>(() => {
    if (this.actionType()) return "Cancel"
    else return "Close"
  });
  readonly validationButtonTitle = computed<string>(() => {
    switch (this.actionType()) {
      case ActionType.create:
        return 'Create';
      case ActionType.update:
        return 'Update';
      case ActionType.delete:
        return 'Delete';
      default:
        return 'Submit';
    }
  });

  readonly elementRef = viewChild.required<ElementRef>('collapseBlock');

  private lastButton: ElementRef | undefined;

  toggle(elementRef: ElementRef) {
    if (this.hidden() || !this.hidden() && elementRef === this.lastButton)
      this.hidden.update(value => !value);
    else
      this.elementRef().nativeElement.scrollIntoView();
    this.lastButton = elementRef;
  }

  hide() {
    this.hidden.set(true);
  }

  onSubmit() {
    const actionType = this.actionType()
    if (actionType)
      this.submitEventActionType$.next(actionType);
  }
}
