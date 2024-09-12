import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CollapseBlockComponent} from "../../../../../components/collapse-block/collapse-block.component";
import {
  PerformanceLogsComponent
} from "../target-set-modal-components/performance-log/performance-logs/performance-logs.component";
import {
  TargetSetCardComponent
} from "../../../../../components/card/target-set/target-set-card/target-set-card.component";
import {TargetSetLogsComponent} from "../target-set-logs/target-set-logs.component";
import {TargetSet} from "../../../../../interface/dto/target-set";
import {ActionType} from "../../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../../interface/utils/form-indicator";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-target-set-collapses',
  standalone: true,
  imports: [
    CollapseBlockComponent,
    PerformanceLogsComponent,
    TargetSetCardComponent,
    TargetSetLogsComponent
  ],
  templateUrl: './target-set-collapses.component.html',
})
export class TargetSetCollapsesComponent {
  @Input() targetSet!: TargetSet;
  @Input() progExercise!: ProgExercise | undefined;
  @Input() isLastTargetSet!: boolean;
  @Input() collapseActionType!: ActionType;
  @Input() targetSetModalId!: string;

  @Output() actionCollapseType: EventEmitter<ActionType> = new EventEmitter<ActionType>();
  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  setTargetSet(event: FormIndicator) {
    this.actionTargetSets.emit(event)
  }

  setCollapseType($event: ActionType) {
    this.collapseActionType = $event
  }
}
