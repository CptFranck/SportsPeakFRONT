import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSet} from "../../../../interface/dto/target-set";
import {CollapseButtonComponent} from "../../../collapse-buton/collapse-button.component";
import {
  TargetSetStateFormComponent
} from "../../../form/target-set/target-set-state-form/target-set-state-form.component";
import {getTargetSetInformation, getTargetSetTimeToString} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";

@Component({
  selector: 'app-target-set-card',
  standalone: true,
  imports: [
    ModalButtonComponent,
    TargetSetStateFormComponent,
    CollapseButtonComponent
  ],
  templateUrl: './target-set-card.component.html',
})
export class TargetSetCardComponent implements OnInit {
  targetSets: string = "";
  targetSetTime: string = "";
  targetSetRestTime: string = "";
  targetSetRepetition: string = "";

  @Input() targetSetModalId!: string;
  @Input() performanceLogModalId!: string;
  @Input() targetSet!: TargetSet;
  @Input() isLastTargetSet: boolean = false;
  @Input() collapseTargetSetId!: string;
  @Input() collapsePerformanceLogId!: string;
  @Input() collapseActionType!: ActionType;

  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();
  @Output() actionPerformanceLogs: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();
  @Output() actionCollapseType: EventEmitter<ActionType> = new EventEmitter<ActionType>();

  protected readonly ActionType = ActionType;

  ngOnInit() {
    this.targetSetTime = getTargetSetTimeToString(this.targetSet, this.isLastTargetSet);
    this.targetSets = getTargetSetInformation(this.targetSet);
    this.targetSetRestTime = getStringTime(this.targetSet.restTime)
    this.targetSetRepetition = getStringTime(this.targetSet.physicalExertionUnitTime)
  }

  addNewPerformance(targetSet: TargetSet) {
    this.actionPerformanceLogs.emit({
      actionType: ActionType.create,
      object: targetSet,
      complement: true
    });
  }

  adjustTargetSet(targetSet: TargetSet): void {
    this.actionTargetSets.emit({
      actionType: ActionType.addEvolution,
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

  setCollapseActionType($event: ActionType) {
    this.actionCollapseType.emit($event)
  }
}
