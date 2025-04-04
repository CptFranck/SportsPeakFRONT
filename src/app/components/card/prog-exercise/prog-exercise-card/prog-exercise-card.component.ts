import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ModalButtonComponent} from "../../../modal/modal-button/modal-button.component";
import {ActionType} from "../../../../interface/enum/action-type";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {RouterLink} from "@angular/router";
import {getTargetSetsInformation} from "../../../../utils/target-set-functions";

@Component({
    selector: 'app-prog-exercise-card',
    imports: [
        NgForOf,
        ModalButtonComponent,
        NgIf,
        RouterLink
    ],
    templateUrl: './prog-exercise-card.component.html'
})
export class ProgExerciseCardComponent implements OnInit {
  exerciseTime: string = "";
  targetSets: string[] = [];
  @Input() modalId!: string;
  @Input() progExercise!: ProgExercise;

  @Output() actionProgExercises: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  ngOnInit() {
    this.exerciseTime = getProgExerciseTime(this.progExercise);
    this.targetSets = getTargetSetsInformation(this.progExercise);
  }

  showProgExercisePreview(progExercise: ProgExercise): void {
    this.actionProgExercises.emit({
      actionType: ActionType.read,
      object: progExercise
    });
  }

  showProgExercisePerformance(progExercise: ProgExercise): void {
    this.actionProgExercises.emit({
      actionType: ActionType.checkPerformance,
      object: progExercise
    });
  }
}
