import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProgExercise} from "../../../../../interface/dto/prog-exercise";
import {getStringTime, getTargetSetTime} from "../../../../../utils/prog-exercise-functions";

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

  @Input() action!: string;
  protected readonly getStringTime = getStringTime;
  protected readonly getTargetSetTime = getTargetSetTime;

  @Input() set progExerciseInput(value: ProgExercise | undefined) {
    this.progExercise = value;
  }
}
