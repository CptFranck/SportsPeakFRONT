import {Component, input} from '@angular/core';
import {Exercise} from "../../../model/dto/exercise";

@Component({
  selector: 'app-exercise-details-display',
  templateUrl: './exercise-details-display.component.html'
})
export class ExerciseDetailsDisplayComponent {
  readonly exercise = input<Exercise>();
}
