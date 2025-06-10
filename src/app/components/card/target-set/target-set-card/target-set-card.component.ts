import {Component, computed, input, output} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {TargetSet} from "../../../../shared/model/dto/target-set";
import {
  TargetSetStateFormComponent
} from "../../../form/target-set/target-set-state-form/target-set-state-form.component";
import {getTargetSetTimeToString} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";
import {TooltipComponent} from "../../../tooltip/tooltip.component";
import {ActionType} from "../../../../shared/model/enum/action-type";

@Component({
  selector: 'app-target-set-card',
  imports: [
    ModalButtonComponent,
    TargetSetStateFormComponent,
    TooltipComponent,
  ],
  templateUrl: './target-set-card.component.html'
})
export class TargetSetCardComponent {

  readonly targetSetModalId = input.required<string>();
  readonly performanceLogModalId = input.required<string>();
  readonly targetSet = input.required<TargetSet>();
  readonly isLastTargetSet = input<boolean>(false);

  readonly targetSetTime = computed<string>(() => getTargetSetTimeToString(this.targetSet(), this.isLastTargetSet()));
  readonly targetSetRestTime = computed<string>(() => getStringTime(this.targetSet().restTime));
  readonly targetSetRepetition = computed<string>(() => getStringTime(this.targetSet().physicalExertionUnitTime));

  readonly actionTargetSets = output<FormIndicator>();
  readonly actionPerformanceLogs = output<FormIndicator>();

  protected readonly ActionType = ActionType;

  addNewPerformance(targetSet: TargetSet) {
    this.actionPerformanceLogs.emit({
      actionType: ActionType.create,
      object: targetSet,
    });
  }

  checkPerformance(targetSet: TargetSet) {
    this.actionPerformanceLogs.emit({
      actionType: ActionType.checkPerformance,
      object: targetSet,
    });
  }

  adjustTargetSet(targetSet: TargetSet): void {
    this.actionTargetSets.emit({
      actionType: ActionType.addEvolution,
      object: targetSet
    });
  }

  checkTargetSet(targetSet: TargetSet) {
    this.actionTargetSets.emit({
      actionType: ActionType.checkEvolution,
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
