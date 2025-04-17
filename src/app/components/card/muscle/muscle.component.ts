import {Component, input} from '@angular/core';
import {Muscle} from "../../../interface/dto/muscle";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-muscle',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './muscle.component.html',
  styleUrl: 'muscle.component.css'
})
export class MuscleComponent {
  muscle = input.required<Muscle>();
}
