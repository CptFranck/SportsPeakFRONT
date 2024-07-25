import {Component, Input, OnInit} from '@angular/core';
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {
  getStringTime,
  getTargetSetInformation,
  getTargetSetTimeToString
} from "../../../../utils/prog-exercise-functions";
import {
  TargetSetStateFormComponent
} from "../../../../page/my-fitness-plan/my-prog-exercise/target-set-modal-components/target-set-state-form/target-set-state-form.component";

@Component({
  selector: 'app-target-set-card-logs',
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

  ngOnInit() {
    this.targetSetTime = getTargetSetTimeToString(this.targetSet, this.isLastTargetSet);
    this.targetSets = getTargetSetInformation(this.targetSet);
    this.targetSetRestTime = getStringTime(this.targetSet.restTime);
    this.targetSetRepetition = getStringTime(this.targetSet.physicalExertionUnitTime);
    this.targetSetCreationDate = new Date(this.targetSet.creationDate);
  }

}
