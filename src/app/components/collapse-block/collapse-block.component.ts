import {Component, computed, ElementRef, input, signal, TemplateRef} from '@angular/core';
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
    const action = this.actionType();
    return action === ActionType.update || action === ActionType.delete;
  });
  readonly validateButtonClass = computed<string>(() => {
    const action = this.actionType();
    if (action == ActionType.delete)
      return "btn-danger"
    return "btn-success"
  });
  readonly closeButtonTitle = computed<string>(() => {
    const action = this.actionType();
    if (action)
      return "Cancel"
    return "Close"
  });
  readonly validationButtonTitle = computed<string>(() => {
    const action = this.actionType();
    if (action == ActionType.create)
      return "Create"
    if (action == ActionType.update)
      return "Update"
    if (action == ActionType.delete)
      return "Delete"
    return "Ok"
  });

  private lastButton: ElementRef | undefined;

  constructor(private readonly elementRef: ElementRef) {
  }

  toggle(elementRef: ElementRef) {
    this.elementRef.nativeElement.scrollIntoView();
    if (this.hidden() || !this.hidden() && elementRef === this.lastButton)
      this.hidden.update(value => !value);
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
