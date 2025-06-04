import {Component, computed, input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";
import {ActionEnum} from "../../../shared/model/enum/action.enum";

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
  readonly actionType = input.required<ActionEnum | undefined>();
  readonly staticBackdrop = input<boolean>(true);
  readonly contentTemplate = input<TemplateRef<any>>();

  submitButton = computed(() => {
    const action = this.actionType();
    return action === ActionEnum.create ||
      action === ActionEnum.update ||
      action === ActionEnum.delete ||
      action === ActionEnum.addEvolution
  });

  closeButtonTitle = computed(() => {
    const action = this.actionType();
    if (action !== ActionEnum.create && action !== ActionEnum.update && action !== ActionEnum.addEvolution && action !== ActionEnum.delete)
      return "Close";
    return 'Cancel';
  });
  validateButtonClass = computed(() => {
    if (this.actionType() === ActionEnum.delete)
      return "btn-danger";
    return "btn-success";
  });
  validationButtonTitle = computed<string>(() => {
    switch (this.actionType()) {
      case ActionEnum.create:
        return "Create";
      case ActionEnum.update:
        return "Update";
      case ActionEnum.addEvolution:
        return "Add an updated objective";
      case ActionEnum.delete:
        return "Delete";
      default:
        return "Ok";
    }
  });

  readonly ActionType = ActionEnum;
  submitEventActionType$ = new Subject<ActionEnum>();

  onSubmit() {
    const action = this.actionType();
    if (action)
      this.submitEventActionType$.next(action);
  }
}
