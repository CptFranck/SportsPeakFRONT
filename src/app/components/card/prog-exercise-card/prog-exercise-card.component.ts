import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProgExercise} from "../../../interface/dto/prog-exercise";

@Component({
  selector: 'app-prog-exercise-card',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './prog-exercise-card.component.html',
})
export class ProgExerciseCardComponent {

  @Input() progExercise!: ProgExercise;
}
