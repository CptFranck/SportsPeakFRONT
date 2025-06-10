import {Component, computed, input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";
import {ActionType} from "../../model/enum/action-type";

@Component({
  selector: 'app-modal',
  imports: [
    NgTemplateOutlet,
  ],
  templateUrl: './modal.component.html',
  standalone: true
})
export class ModalComponent {

  readonly title = input.required<string>();
  readonly modalId = input.required<string>();
  readonly actionType = input.required<ActionType | undefined>();
  readonly staticBackdrop = input<boolean>(true);
  readonly contentTemplate = input<TemplateRef<any>>();

  submitButton = computed(() => {
    const action = this.actionType();
    return action === ActionType.create ||
      action === ActionType.update ||
      action === ActionType.delete ||
      action === ActionType.addEvolution
  });

  closeButtonTitle = computed(() => {
    const action = this.actionType();
    if (action !== ActionType.create && action !== ActionType.update && action !== ActionType.addEvolution && action !== ActionType.delete)
      return "Close";
    return 'Cancel';
  });
  validateButtonClass = computed(() => {
    if (this.actionType() === ActionType.delete)
      return "btn-danger";
    return "btn-success";
  });
  validationButtonTitle = computed<string>(() => {
    switch (this.actionType()) {
      case ActionType.create:
        return "Create";
      case ActionType.update:
        return "Update";
      case ActionType.addEvolution:
        return "Add an updated objective";
      case ActionType.delete:
        return "Delete";
      default:
        return "Ok";
    }
  });

  readonly ActionType = ActionType;
  submitEventActionType$ = new Subject<ActionType>();

  onSubmit() {
    const action = this.actionType();
    if (action)
      this.submitEventActionType$.next(action);
  }
}
