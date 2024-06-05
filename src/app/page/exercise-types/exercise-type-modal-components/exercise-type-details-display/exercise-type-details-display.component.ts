import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ExerciseType} from "../../../../interface/dto/exerciseType";

@Component({
  selector: 'app-exercise-type-details-display',
  standalone: true,
  imports: [
    NgForOf
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
