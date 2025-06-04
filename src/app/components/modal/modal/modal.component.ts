import {Component, computed, input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {Subject} from "rxjs";
import {ActionTypeEnum} from "../../../shared/model/enum/action-type.enum";

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
  readonly actionType = input.required<ActionTypeEnum | undefined>();
  readonly staticBackdrop = input<boolean>(true);
  readonly contentTemplate = input<TemplateRef<any>>();

  submitButton = computed(() => {
    const action = this.actionType();
    return action === ActionTypeEnum.create ||
      action === ActionTypeEnum.update ||
      action === ActionTypeEnum.delete ||
      action === ActionTypeEnum.addEvolution
  });

  closeButtonTitle = computed(() => {
    const action = this.actionType();
    if (action !== ActionTypeEnum.create && action !== ActionTypeEnum.update && action !== ActionTypeEnum.addEvolution && action !== ActionTypeEnum.delete)
      return "Close";
    return 'Cancel';
  });
  validateButtonClass = computed(() => {
    if (this.actionType() === ActionTypeEnum.delete)
      return "btn-danger";
    return "btn-success";
  });
  validationButtonTitle = computed<string>(() => {
    switch (this.actionType()) {
      case ActionTypeEnum.create:
        return "Create";
      case ActionTypeEnum.update:
        return "Update";
      case ActionTypeEnum.addEvolution:
        return "Add an updated objective";
      case ActionTypeEnum.delete:
        return "Delete";
      default:
        return "Ok";
    }
  });

  readonly ActionType = ActionTypeEnum;
  submitEventActionType$ = new Subject<ActionTypeEnum>();

  onSubmit() {
    const action = this.actionType();
    if (action)
      this.submitEventActionType$.next(action);
  }
}
