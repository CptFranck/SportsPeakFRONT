import {Component, input} from '@angular/core';
import {Muscle} from "../../../interface/dto/muscle";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-muscle-card',
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './muscle-card.component.html',
  styleUrl: 'muscle-card.component.css'
})
export class MuscleCardComponent {
  readonly muscle = input.required<Muscle>();
}
