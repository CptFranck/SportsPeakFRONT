import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalButtonComponent} from "../../modal/modal-button/modal-button.component";
import {ProgExercise} from "../../../interface/dto/prog-exercise";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {ActionType} from "../../../enum/action-type";
import {TargetSet} from "../../../interface/dto/target-set";
import {getStringTime, getTargetSetInformation, getTargetSetTime} from "../../../utils/prog-exercise-functions";

@Component({
  selector: 'app-target-set-card',
  standalone: true,
  imports: [
    ModalButtonComponent
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

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  ngOnInit() {
    this.targetSetTime = getTargetSetTime(this.targetSet);
    this.targetSets = getTargetSetInformation(this.targetSet);
    this.targetSetRestTime = getStringTime(
      this.targetSet.restTime.seconds,
      this.targetSet.restTime.minutes,
      this.targetSet.restTime.hours
    )
    this.targetSetRepetition = getStringTime(
      this.targetSet.physicalExertionUnitTime.seconds,
      this.targetSet.physicalExertionUnitTime.minutes,
      this.targetSet.physicalExertionUnitTime.hours
    )
  }

  showProgExercisePerformance(progExercise: ProgExercise): void {
  }

  modifyProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionType.update,
      object: progExercise
    });
  }

  delProgExercise(progExercise: ProgExercise) {
    this.actionProgExercises.emit({
      actionType: ActionType.delete,
      object: progExercise
    });
  }
}
