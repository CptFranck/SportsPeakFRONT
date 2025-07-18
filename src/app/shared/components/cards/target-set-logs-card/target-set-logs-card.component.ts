import {Component, computed, input, output} from '@angular/core';
import {TargetSet} from "../../../model/dto/target-set";
import {FormIndicator} from "../../../model/common/form-indicator";
import {getTargetSetTimeToString} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";
import {CollapseBlockComponent} from "../../collapse-block/collapse-block.component";
import {CollapseButtonComponent} from "../../collapse-buton/collapse-button.component";
import {ActionType} from "../../../model/enum/action-type";

@Component({
  selector: 'app-target-set-logs-card',
  imports: [
    CollapseButtonComponent
  ],
  templateUrl: './target-set-logs-card.component.html'
})
export class TargetSetLogsCardComponent {

  readonly targetSet = input.required<TargetSet>();
  readonly formCollapseId = input.required<string>();
  readonly collapseBlockComponent = input.required<CollapseBlockComponent>();

  readonly isLastTargetSet = input<boolean>(false);

  readonly targetSetTime = computed<string>(() => getTargetSetTimeToString(this.targetSet(), this.isLastTargetSet()));
  readonly targetSetRestTime = computed<string>(() => getStringTime(this.targetSet().restTime));
  readonly targetSetRepetition = computed<string>(() => getStringTime(this.targetSet().physicalExertionUnitTime));
  readonly targetSetCreationDate = computed<Date>(() => new Date(this.targetSet().creationDate));

  readonly actionTargetSets = output<FormIndicator>();

  checkPerformanceLogs(targetSet: TargetSet) {
    this.actionTargetSets.emit({
      actionType: ActionType.checkPerformance,
      object: targetSet
    });
  }

  modifyTargetSet(targetSet: TargetSet) {
    this.actionTargetSets.emit({
      actionType: ActionType.update,
      object: targetSet
    });
  }

  delTargetSet(targetSet: TargetSet) {
    this.actionTargetSets.emit({
      actionType: ActionType.delete,
      object: targetSet
    });
  }
}
