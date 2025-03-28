import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TargetSet} from "../../../../interface/dto/target-set";
import {ActionType} from "../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {getTargetSetInformation, getTargetSetTimeToString} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";
import {CollapseButtonComponent} from "../../../collapse-buton/collapse-button.component";

@Component({
  selector: 'app-target-set-logs-card',
  imports: [
    CollapseButtonComponent
  ],
  templateUrl: './target-set-logs-card.component.html'
})
export class TargetSetLogsCardComponent implements OnInit {
  targetSets: string = "";
  targetSetTime: string = "";
  targetSetRestTime: string = "";
  targetSetRepetition: string = "";
  targetSetCreationDate!: Date;

  @Input() targetSet!: TargetSet;
  @Input() collapseBlockComponent!: CollapseBlockComponent;
  @Input() formCollapseId!: string;
  @Input() isLastTargetSet: boolean = false;

  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  ngOnInit() {
    this.targetSetTime = getTargetSetTimeToString(this.targetSet, this.isLastTargetSet);
    this.targetSets = getTargetSetInformation(this.targetSet);
    this.targetSetRestTime = getStringTime(this.targetSet.restTime);
    this.targetSetRepetition = getStringTime(this.targetSet.physicalExertionUnitTime);
    this.targetSetCreationDate = new Date(this.targetSet.creationDate);
  }

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
