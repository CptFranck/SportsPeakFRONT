import {Component, input} from '@angular/core';
import {Muscle} from "../../../interface/dto/muscle";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-muscle-card',
  imports: [
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './muscle-card.component.html',
  styleUrl: 'muscle-card.component.css'
})
export class MuscleCardComponent {
  muscle = input.required<Muscle>();
}
