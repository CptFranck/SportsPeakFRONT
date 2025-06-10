import {Component, input, output} from '@angular/core';
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {TargetSet} from "../../../../../shared/model/dto/target-set";
import {ModalButtonComponent} from "../../../../../shared/components/modal-button/modal-button.component";
import {
  TargetSetDeleteFormComponent
} from "../../../../../shared/components/forms/target-set/target-set-delete-form/target-set-delete-form.component";
import {
  TargetSetEntityFormComponent
} from "../../../../../shared/components/forms/target-set/target-set-entity-form/target-set-entity-form.component";
import {ProgExercise} from "../../../../../shared/model/dto/prog-exercise";
import {
  TargetSetLogsComponent
} from "../../../../../shared/components/modal-components/target-set-logs/target-set-logs.component";
import {PerformanceLog} from "../../../../../shared/model/dto/performance-log";
import {FormIndicator} from "../../../../../shared/model/common/form-indicator";
import {ActionType} from "../../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-target-set-modal',
  imports: [
    ModalComponent,
    ModalButtonComponent,
    TargetSetDeleteFormComponent,
    TargetSetEntityFormComponent,
    TargetSetLogsComponent,
  ],
  templateUrl: './target-set-modal.component.html'
})
export class TargetSetModalComponent {

  readonly targetSetModalId = input.required<string>();
  readonly targetSetModalTitle = input.required<string>();
  readonly targetSet = input.required<TargetSet | undefined>();
  readonly progExercise = input.required<ProgExercise | undefined>();
  readonly performanceLog = input.required<PerformanceLog | undefined>();
  readonly action = input.required<ActionType>();

  readonly actionTargetSet = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  onClick() {
    this.actionTargetSet.emit({
      object: undefined,
      actionType: ActionType.create
    })
  }
}
