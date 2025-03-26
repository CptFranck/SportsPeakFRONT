import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSet} from "../../../../interface/dto/target-set";
import {
  TargetSetStateFormComponent
} from "../../../form/target-set/target-set-state-form/target-set-state-form.component";
import {getTargetSetInformation, getTargetSetTimeToString} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";

@Component({
  selector: 'app-target-set-card',
  imports: [
    ModalButtonComponent,
    TargetSetStateFormComponent,
  ],
  templateUrl: './target-set-card.component.html'
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

  @Output() actionTargetSets: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();
  @Output() actionPerformanceLogs: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

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
