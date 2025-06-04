import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Muscle} from "../../../shared/model/dto/muscle";

@Component({
  selector: 'app-muscle-exercises-table',
  imports: [
    RouterLink
  ],
  templateUrl: './muscle-exercises-table.component.html',
  styleUrl: './muscle-exercises-table.component.css'
})
export class MuscleExercisesTableComponent {
  muscle = input.required<Muscle | undefined>();
}
