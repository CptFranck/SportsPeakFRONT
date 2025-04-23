import {Component, input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Muscle} from "../../../interface/dto/muscle";

@Component({
  selector: 'app-muscle-exercises-table',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './muscle-exercises-table.component.html',
  styleUrl: './muscle-exercises-table.component.css'
})
export class MuscleExercisesTableComponent {
  muscle = input.required<Muscle | undefined>();
}
