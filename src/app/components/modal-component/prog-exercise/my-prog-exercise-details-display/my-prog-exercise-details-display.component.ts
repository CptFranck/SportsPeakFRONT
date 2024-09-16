import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";

import {TargetSet} from "../../../../interface/dto/target-set";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {TargetSetInformation} from "../../../../interface/utils/target-set-row-detail";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {
  getTargetSetTimeToString,
  getUpToDateTargetSets,
  sortLastTargetSetsByIndex
} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";

@Component({
  selector: 'app-my-prog-exercise-details-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './my-prog-exercise-details-display.component.html',
})
export class MyProgExerciseDetailsDisplayComponent {
  progExercise: ProgExercise | undefined;
  exerciseTime: string = "";
  displayedTargetSets: TargetSet[] = [];
  targetSetsInformation: Dictionary<TargetSetInformation> = {}

  @Input() action!: string;

  @Input() set progExerciseInput(value: ProgExercise | undefined) {

    this.progExercise = value;
    if (value) {
      this.exerciseTime = getProgExerciseTime(value);
      this.displayedTargetSets = getUpToDateTargetSets(value).sort(sortLastTargetSetsByIndex);
      this.displayedTargetSets.forEach((targetSet: TargetSet, key: number, array: TargetSet[]) => {
        this.targetSetsInformation[targetSet.id] = {
          setRep: targetSet?.setNumber + " set(s) of " + targetSet?.repetitionNumber + " reps",
          weight: " " + targetSet.weight + " " + targetSet.weightUnit,
          effortTime: getStringTime(targetSet.physicalExertionUnitTime),
          restTime: getStringTime(targetSet.restTime),
          setTime: getTargetSetTimeToString(targetSet, (array.length - 1 === key)),
        }
      })
    }
  }
}
