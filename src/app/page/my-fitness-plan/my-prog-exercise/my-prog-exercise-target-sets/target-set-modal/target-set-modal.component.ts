import {Component, input, output} from '@angular/core';
import {ModalComponent} from "../../../../../components/modal/modal/modal.component";
import {TargetSet} from "../../../../../shared/model/dto/target-set";
import {ModalButtonComponent} from "../../../../../components/modal/modal-button/modal-button.component";
import {
  TargetSetDeleteFormComponent
} from "../../../../../components/form/target-set/target-set-delete-form/target-set-delete-form.component";
import {
  TargetSetEntityFormComponent
} from "../../../../../components/form/target-set/target-set-entity-form/target-set-entity-form.component";
import {ProgExercise} from "../../../../../shared/model/dto/prog-exercise";
import {
  TargetSetLogsComponent
} from "../../../../../components/modal-component/target-set/target-set-logs/target-set-logs.component";
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
