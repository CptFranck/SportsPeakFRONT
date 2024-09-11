import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {ActionType} from "../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {
  TargetSetStateFormComponent
} from "../../../../page/my-fitness-plan/my-prog-exercise/my-prog-exercise-target-sets/target-set-modal-components/target-set-state-form/target-set-state-form.component";
import {getTargetSetInformation, getTargetSetTimeToString} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";

@Component({
  selector: 'app-target-set-logs-card',
  standalone: true,
  imports: [
    ModalButtonComponent,
    TargetSetStateFormComponent
  ],
  templateUrl: './target-set-logs-card.component.html',
})
export class TargetSetLogsCardComponent implements OnInit {
  targetSets: string = "";
  targetSetTime: string = "";
  targetSetRestTime: string = "";
  targetSetRepetition: string = "";
  targetSetCreationDate!: Date;

  @Input() modalId!: string;
  @Input() targetSet!: TargetSet;
  @Input() isLastTargetSet: boolean = false;

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  ngOnInit() {
    this.targetSetTime = getTargetSetTimeToString(this.targetSet, this.isLastTargetSet);
    this.targetSets = getTargetSetInformation(this.targetSet);
    this.targetSetRestTime = getStringTime(this.targetSet.restTime);
    this.targetSetRepetition = getStringTime(this.targetSet.physicalExertionUnitTime);
    this.targetSetCreationDate = new Date(this.targetSet.creationDate);
  }

  modifyTargetSet(targetSet: TargetSet) {
    this.actionProgExercises.emit({
      actionType: ActionType.update,
      object: targetSet
    });
  }

  delTargetSet(targetSet: TargetSet) {
    this.actionProgExercises.emit({
      actionType: ActionType.delete,
      object: targetSet
    });
  }
}
