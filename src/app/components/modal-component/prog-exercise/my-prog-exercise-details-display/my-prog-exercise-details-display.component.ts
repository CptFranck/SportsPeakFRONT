import {Component, computed, input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TargetSet} from "../../../../interface/dto/target-set";
import {Dictionary} from "../../../../interface/utils/dictionary";
import {TargetSetInformation} from "../../../../interface/utils/target-set-row-detail";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {getProgExerciseTime} from "../../../../utils/prog-exercise-functions";
import {
  getTargetSetTimeToString,
  getUpToDateTargetSets,
  sortLastTargetSetsByIndex
} from "../../../../utils/target-set-functions";
import {getStringTime} from "../../../../utils/duration-functions";

@Component({
  selector: 'app-my-prog-exercise-details-display',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './my-prog-exercise-details-display.component.html'
})
export class MyProgExerciseDetailsDisplayComponent {
  progExercise = input.required<ProgExercise | undefined>();
  exerciseTime = computed<string>(() => {
    const progExercise = this.progExercise();
    if (progExercise)
      return getProgExerciseTime(progExercise);
    return "";
  });
  displayedTargetSets = computed<TargetSet[]>(() => {
    const progExercise = this.progExercise();
    if (progExercise)
      return getUpToDateTargetSets(progExercise).sort(sortLastTargetSetsByIndex);
    return [];
  });
  targetSetsInformation = computed<Dictionary<TargetSetInformation>>(() => {
    const progExercise = this.progExercise();
    const targetSetInformation: Dictionary<TargetSetInformation> = {};
    if (progExercise)
      this.displayedTargetSets().forEach((targetSet: TargetSet, key: number, array: TargetSet[]) => {
        targetSetInformation[targetSet.id] = {
          setRep: targetSet?.setNumber + " set(s) of " + targetSet?.repetitionNumber + " reps",
          weight: " " + targetSet.weight + " " + targetSet.weightUnit,
          effortTime: getStringTime(targetSet.physicalExertionUnitTime),
          restTime: getStringTime(targetSet.restTime),
          setTime: getTargetSetTimeToString(targetSet, (array.length - 1 === key)),
        }
      })
    return targetSetInformation;
  });
}
