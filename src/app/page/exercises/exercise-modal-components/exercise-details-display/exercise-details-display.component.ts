import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Exercise} from "../../../../interface/dto/exercise";

@Component({
  selector: 'app-exercise-details-display',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './exercise-details-display.component.html',
})
export class ExerciseDetailsDisplayComponent {
  exercise: Exercise | undefined;
  @Input() action!: string;

  @Input() set exerciseInput(value: Exercise | undefined) {
    this.exercise = value;
  }
}
