import {Component, input} from '@angular/core';
import {ExerciseType} from "../../../model/dto/exercise-type";

@Component({
  selector: 'app-exercise-type-details-display',
  templateUrl: './exercise-type-details-display.component.html'
})
export class ExerciseTypeDetailsDisplayComponent {
  readonly exerciseType = input<ExerciseType>();
}
