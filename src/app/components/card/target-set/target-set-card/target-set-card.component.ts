import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {TargetSet} from "../../../../interface/dto/target-set";
import {
  getStringTime,
  getTargetSetInformation,
  getTargetSetTimeToString
} from "../../../../utils/prog-exercise-functions";
import {CollapseButtonComponent} from "../../../collapse-buton/collapse-button.component";
import {
  TargetSetStateFormComponent
} from "../../../../page/my-fitness-plan/my-prog-exercise/my-prog-exercise-target-sets/target-set-modal-components/target-set-state-form/target-set-state-form.component";

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

  @Input() modalId!: string;
  @Input() targetSet!: TargetSet;
  @Input() isLastTargetSet: boolean = false;
  @Input() collapseId!: string;

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  ngOnInit() {
    this.targetSetTime = getTargetSetTimeToString(this.targetSet, this.isLastTargetSet);
    this.targetSets = getTargetSetInformation(this.targetSet);
    this.targetSetRestTime = getStringTime(this.targetSet.restTime)
    this.targetSetRepetition = getStringTime(this.targetSet.physicalExertionUnitTime)
  }

  addNewPerformance(targetSet: TargetSet) {
    this.actionProgExercises.emit({
      actionType: ActionType.addPerformance,
      object: targetSet
    });
  }

  checkTargetSetPerformance(targetSet: TargetSet): void {
    this.actionProgExercises.emit({
      actionType: ActionType.checkPerformance,
      object: targetSet
    });
  }

  adjustTargetSet(targetSet: TargetSet): void {
    this.actionProgExercises.emit({
      actionType: ActionType.addEvolution,
      object: targetSet
    });
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
