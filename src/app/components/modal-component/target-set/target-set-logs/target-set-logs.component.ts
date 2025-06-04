import {Component, computed, input, output, signal} from '@angular/core';
import {TargetSet} from "../../../../shared/model/dto/target-set";
import {TargetSetLogsCardComponent} from "../../../card/target-set/target-set-logs-card/target-set-logs-card.component";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {getTargetSetLogs} from "../../../../utils/target-set-functions";
import {ActionTypeEnum} from "../../../../shared/model/enum/action-type.enum";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";
import {
  TargetSetEntityFormComponent
} from "../../../form/target-set/target-set-entity-form/target-set-entity-form.component";
import {
  TargetSetDeleteFormComponent
} from "../../../form/target-set/target-set-delete-form/target-set-delete-form.component";
import {PerformanceLogsComponent} from "../../performance-log/performance-logs/performance-logs.component";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";

@Component({
  selector: 'app-target-set-logs',
  imports: [
    TargetSetLogsCardComponent,
    CollapseBlockComponent,
    TargetSetEntityFormComponent,
    TargetSetDeleteFormComponent,
    PerformanceLogsComponent
  ],
  templateUrl: './target-set-logs.component.html'
})
export class TargetSetLogsComponent {
  readonly targetSetFormCollapseId: string = "TargetSetFormCollapseId";

  readonly modalId = input.required<string>();
  readonly targetSet = input.required<TargetSet | undefined>();
  readonly progExercise = input.required<ProgExercise | undefined>();

  readonly targetSetLogs = computed<TargetSet[]>(() => {
    const targetSet = this.targetSet();
    const progExercise = this.progExercise();
    if (targetSet && progExercise) {
      return getTargetSetLogs(targetSet, progExercise);
    }
    return [];
  });

  action = signal<ActionTypeEnum>(ActionTypeEnum.read);
  blocTitle = signal<string | undefined>(undefined);
  targetSetLog = signal<TargetSet | undefined>(undefined);

  readonly actionTargetSets = output<FormIndicator>();

  protected readonly ActionType = ActionTypeEnum;

  setTargetSet(formIndicator: FormIndicator) {
    this.action.set(formIndicator.actionType);
    this.targetSetLog.set(formIndicator.object);
    if (this.action() === ActionTypeEnum.checkPerformance)
      this.blocTitle.set(undefined);
    else
      this.blocTitle.set("Set created on " + new Date(formIndicator.object?.creationDate).toLocaleDateString());
  }
}
