import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ExerciseType} from "../../../../../interface/dto/exercise-type";

@Component({
  selector: 'app-exercise-type-details-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './exercise-type-details-display.component.html',
})
export class ExerciseTypeDetailsDisplayComponent {
  exerciseType: ExerciseType | undefined;
  @Input() action!: string;

  @Input() set exerciseTypeInput(value: ExerciseType | undefined) {
    this.exerciseType = value;
  }
}
