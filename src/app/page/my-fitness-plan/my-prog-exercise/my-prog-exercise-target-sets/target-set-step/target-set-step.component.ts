import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CollapseBlockComponent} from "../../../../../components/collapse-block/collapse-block.component";
import {
  TargetSetCardComponent
} from "../../../../../components/card/target-set/target-set-card/target-set-card.component";
import {TargetSetLogsComponent} from "../target-set-logs/target-set-logs.component";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ActionType} from "../../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-target-step',
  standalone: true,
  imports: [
    CollapseBlockComponent,
    TargetSetCardComponent,
    TargetSetLogsComponent
  ],
  templateUrl: './target-set-step.component.html',
})
export class TargetSetStepComponent {
  @Input() targetSet!: TargetSet;
  @Input() progExercise!: ProgExercise | undefined;
  @Input() isLastTargetSet!: boolean;
  @Input() collapseActionType!: ActionType;
  @Input() targetSetModalId!: string;
  @Input() performanceLogModalId!: string;

  @Output() actionCollapseType: EventEmitter<ActionType> = new EventEmitter<ActionType>();
  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();
  @Output() actionPerformanceLogs: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  setTargetSet(event: FormIndicator) {
    this.actionTargetSets.emit(event)
  }

  setCollapseType($event: ActionType) {
    this.collapseActionType = $event
  }

  setPerformanceLog(event: FormIndicator) {
    this.actionPerformanceLogs.emit(event)
  }
}
